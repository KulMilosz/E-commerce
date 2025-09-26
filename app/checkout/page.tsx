"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumb from "../components/layout/Breadcrumb";
import { CartItem, CartResponse } from "../types";
import CheckoutDetails from "../components/checkout/CheckoutDetails";
import OrderSummary from "../components/checkout/OrderSummary";

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
          throw new Error(data.error || "Błąd pobierania koszyka");
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
          setError("Nieznany błąd");
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

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedCartItemIds,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Błąd tworzenia zamówienia");
      }

      const orderData = await response.json(); // Will be used for future order summary page

      router.push("/cart");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Błąd: ${err.message}`);
      } else {
        alert("Nieznany błąd podczas tworzenia zamówienia");
      }
    }
  };

  if (loading) return <div className="p-10">Ładowanie...</div>;
  if (error) return <div className="p-10">Błąd: {error}</div>;
  if (!selectedItems || selectedItems.length === 0) {
    return <div className="p-10">Brak zaznaczonych produktów do checkout</div>;
  }

  return (
    <div className="flex flex-col p-10">
      <Breadcrumb />

      <div className="flex w-full justify-between gap-8 mt-8">
        <div className="flex flex-col gap-8 w-full max-w-4xl">
          <h2 className="text-heading-w-6 font-medium ">Your Order</h2>
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
