"use client";

import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../components/layout/Breadcrumb";
import { CartResponse } from "../types";
import ProductCardCart from "../components/cart/ProductCardCart";
import { removeFromCart } from "../lib/removeFromCart";
import Total from "../components/cart/Total";
import { showNotification } from "../components/providers/NotificationProvider";

export default function CartPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [itemTotals, setItemTotals] = useState<
    Record<string, { qty: number; total: number }>
  >({});
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const selectAllRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch("/api/cart");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Error fetching cart");
        }
        const data: CartResponse = await res.json();
        setCart(data);
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

    fetchCart();
  }, []);

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      const data = await removeFromCart(cartItemId);
      setCart(data);
      setSelected((prev) => prev.filter((x) => x !== cartItemId));
      setItemTotals((prev) => {
        const clone = { ...prev };
        delete clone[cartItemId];
        return clone;
      });
    } catch (error) {
      showNotification({
        type: "error",
        title: "Error",
        message: "Failed to remove product from cart",
        duration: 3000,
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center">
        Loading cart...
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!cart || cart.cartItems.length === 0)
    return (
      <div className="flex justify-center items-center">
        Your cart is empty
      </div>
    );

  return (
    <div className="flex flex-col p-10">
      <Breadcrumb />
      <label className="mb-4 flex items-center gap-2 mt-12 cursor-pointer w-fit">
        <input
          ref={selectAllRef}
          type="checkbox"
          className="w-6 h-6 mr-2 accent-[#F29145] cursor-pointer"
          checked={
            selected.length > 0 &&
            cart.cartItems.length > 0 &&
            selected.length === cart.cartItems.length
          }
          onChange={() => {
            const allIds = cart.cartItems.map((i) => i.id);
            const allSelected =
              selected.length > 0 && selected.length === allIds.length;
            setSelected(allSelected ? [] : allIds);
          }}
        />
        Select All
      </label>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-8 w-full ">
          {cart.cartItems.map((item) => (
            <div key={item.id} className="flex">
              <div className="flex items-center justify-center">
                <input
                  className="w-6 h-6 mr-6 accent-[#F29145] cursor-pointer"
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() =>
                    setSelected((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((x) => x !== item.id)
                        : [...prev, item.id]
                    )
                  }
                />
              </div>

              <div className="flex items-center rounded-lg justify-between w-full">
                <ProductCardCart
                  product={item.product}
                  quantity={item.quantity}
                  cartItemId={item.id}
                  onItemTotalChange={(qty, total) =>
                    setItemTotals((prev) => ({
                      ...prev,
                      [item.id]: { qty, total },
                    }))
                  }
                  onRemove={() => handleRemoveItem(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex h-full ">
          <div className="flex items-center justify-center self-center">
            <Total
              cartItems={cart.cartItems}
              selected={selected}
              itemTotals={itemTotals}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
