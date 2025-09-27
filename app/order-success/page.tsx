"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCardCart from "../components/cart/ProductCardCart";
import Link from "next/link";
import { showNotification } from "../components/providers/NotificationProvider";
import { OrderSuccessOrder } from "../types";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderSuccessOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setShouldRedirect(true);
        router.replace("/");
        return;
      }

      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          setShouldRedirect(true);
          router.replace("/");
          return;
        }

        const orderData = await response.json();
        setOrder(orderData);
      } catch (err) {
        showNotification({
          type: "error",
          title: "Error",
          message: "Failed to load order",
          duration: 5000,
        });
        console.log(err);
        setShouldRedirect(true);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderId, router]);

  if (shouldRedirect) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const totalItems = order.orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="flex w-full min-h-screen items-cente justify-center mt-12 mb-20 ">
      <div className="flex flex-col bg-[#262626] p-6 border-1 border-[#383B42] rounded-lg gap-6">
        <div className="flex justify-center items-center w-18 h-18 rounded-full border-4 border-[#4ADE80] text-[#4ADE80] text-3xl font-bold mx-70">
          ✓
        </div>
        <div className="flex justify-center">
          <h1 className="text-heading-w-6 font-medium">
            Thanks for Your Order!
          </h1>
        </div>
        <div className="flex justify-center">
          <span className="text-[#E7E7E7] text-text-m font-medium">
            {order.id}
          </span>
        </div>
        <div className="flex flex-col pt-6 pb-6 border-b-2 border-[#383B42] gap-4">
          <span className="text-text-l font-medium">Transaction Date</span>
          <span className="text-[#E7E7E7] text-text-m font-medium">
            {formatDate(order.createdAt)}
          </span>
        </div>
        <div className="flex flex-col pt-6 pb-6 border-b-2 border-[#383B42] gap-4">
          <span className="text-text-l font-medium">Payment Method</span>
          <span className="text-[#E7E7E7] text-text-m font-medium">
            Apple Pay
          </span>
        </div>
        <div className="flex flex-col pt-6 pb-6 border-b-2 border-[#383B42] gap-4">
          <span className="text-text-l font-medium">Shipping Method</span>
          <span className="text-[#E7E7E7] text-text-m font-medium">
            DevstockHub Courier
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-text-l font-medium">Your Order</span>

          {order.orderItems.map((item) => (
            <ProductCardCart
              key={item.id}
              product={{
                ...item.product,
                price: item.priceAtPurchase,
              }}
              quantity={item.quantity}
              showRemoveButton={false}
              showQuantitySelector={false}
              onItemTotalChange={undefined}
              onRemove={undefined}
            />
          ))}
        </div>
        <div className="flex flex-col gap-4 pb-6 border-b-2 border-[#383B42]">
          <div className="flex justify-between">
            <span className="text-text-m font-medium">
              Total Product Price ({totalItems} Items)
            </span>
            <span className="text-text-l font-medium">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-m font-medium">
              Total Product Protection
            </span>
            <span className="text-text-l font-medium">$1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-m font-medium">
              Total Shipping Price
            </span>
            <span className="text-text-l font-medium">$5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-m font-medium">Shipping Insurance</span>
            <span className="text-text-l font-medium">$6</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-b-2 border-[#383B42] pb-6">
          <span className="text-text-l font-medium">Transaction Fees</span>
          <div className="flex justify-between">
            <span className="text-text-m font-medium">Service Fees</span>
            <span className="text-text-l font-medium">
              ${(totalItems * 0.5).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <span className="text-text-l font-medium">Grand total</span>
            <span className="text-heading-w-5 font-medium">
              ${order.totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-l font-medium">Status</span>
            <span className="text-text-s font-medium bg-[#295B40] p-2 rounded-lg">
              Success
            </span>
          </div>
        </div>
        <button
          onClick={() => router.push("/")}
          className="w-full p-3 text-center text-[#262626] text-text-m font-medium bg-[#F29145] rounded-lg mt-2 cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
