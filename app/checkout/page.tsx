"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumb from "../components/layout/Breadcrumb";
import { CartItem, CartResponse } from "../types";
import CheckoutDetails from "../components/checkout/CheckoutDetails";
import OrderSummary from "../components/checkout/OrderSummary";
import { showNotification } from "../components/providers/NotificationProvider";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemTotals, setItemTotals] = useState<
    Record<string, { qty: number; total: number }>
  >({});
  const [productProtection, setProductProtection] = useState(true);

  useEffect(() => {
    async function fetchCartAndFilterSelected() {
      try {
        const selectedParam = searchParams.get("selected");
        if (!selectedParam) {
          setError("No items selected for checkout");
          setLoading(false);
          return;
        }

        const selectedIds = selectedParam.split(",").filter(Boolean);

        const res = await fetch("/api/cart");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Error fetching cart");
        }

        const cartData: CartResponse = await res.json();

        const filteredItems = cartData.cartItems.filter((item) =>
          selectedIds.includes(item.id)
        );

        if (filteredItems.length === 0) {
          setError("No valid selected items found");
          setLoading(false);
          return;
        }

        setSelectedItems(filteredItems);

        const initialTotals: Record<string, { qty: number; total: number }> =
          {};
        filteredItems.forEach((item) => {
          initialTotals[item.id] = {
            qty: item.quantity,
            total: item.quantity * item.product.price,
          };
        });
        setItemTotals(initialTotals);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCartAndFilterSelected();
  }, [searchParams]);

  const handleItemTotalChange = (
    itemId: string,
    qty: number,
    total: number
  ) => {
    setItemTotals((prev) => ({
      ...prev,
      [itemId]: { qty, total },
    }));
  };

  const handlePayNow = async () => {
    try {
      const selectedCartItemIds = selectedItems.map((item) => item.id);

      const itemsWithQuantities = selectedItems.map((item) => {
        const currentTotal = itemTotals[item.id];
        return {
          cartItemId: item.id,
          quantity: currentTotal ? currentTotal.qty : item.quantity,
        };
      });

      const totalProductPrice = selectedItems.reduce((sum, item) => {
        const current = itemTotals[item.id];
        const total = current
          ? current.total
          : item.quantity * item.product.price;
        return sum + total;
      }, 0);

      const totalQuantity = selectedItems.reduce((sum, item) => {
        const current = itemTotals[item.id];
        const qty = current ? current.qty : item.quantity;
        return sum + qty;
      }, 0);

      const productProtectionPrice = productProtection ? 1 : 0;
      const shippingPrice = 5;
      const shippingInsurance = 6;
      const transactionFees = totalQuantity * 0.5;

      const grandTotal =
        totalProductPrice +
        productProtectionPrice +
        shippingPrice +
        shippingInsurance +
        transactionFees;

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedCartItemIds,
          itemsWithQuantities,
          grandTotal,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error creating order");
      }

      const orderData = await response.json();

      router.push(`/order-success?orderId=${orderData.id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showNotification({
          type: "error",
          title: "Error",
          message: err.message,
          duration: 5000,
        });
      } else {
        showNotification({
          type: "error",
          title: "Error",
          message: "Unknown error occurred while creating order",
          duration: 5000,
        });
      }
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10">Error: {error}</div>;
  if (!selectedItems || selectedItems.length === 0) {
    return <div className="p-10">No selected items for checkout</div>;
  }

  return (
    <div className="flex flex-col p-10">
      <Breadcrumb />

      <div className="flex w-full justify-between gap-8 mt-8">
        <div className="flex flex-col gap-8 w-full max-w-4xl">
          <h2 className="lg:text-heading-w-6 text-heading-m-6 font-medium ">
            Your Order
          </h2>
          <CheckoutDetails
            selectedItems={selectedItems}
            itemTotals={itemTotals}
            onItemTotalChange={handleItemTotalChange}
            productProtection={productProtection}
            onProductProtectionChange={setProductProtection}
          />
        </div>

        <div className="flex h-full">
          <div className="flex items-start justify-center">
            <OrderSummary
              selectedItems={selectedItems}
              itemTotals={itemTotals}
              onPayNow={handlePayNow}
              productProtection={productProtection}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
