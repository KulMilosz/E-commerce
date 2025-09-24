"use client";

import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../components/layout/Breadcrumb";
import { CartItem } from "../types";
import ProductCardCart from "../components/cart/ProductCardCart";
import { removeFromCart } from "../lib/removeFromCart";

interface CartResponse {
  id: string;
  cartItems: CartItem[];
}

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
          throw new Error(data.error || "Błąd pobierania koszyka");
        }
        const data: CartResponse = await res.json();
        setCart(data);
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
    } catch {}
  };

  if (loading) return <div>Ładowanie koszyka...</div>;
  if (error) return <div>Błąd: {error}</div>;
  if (!cart || cart.cartItems.length === 0)
    return <div>Twój koszyk jest pusty</div>;

  return (
    <div className="flex flex-col p-10">
      <Breadcrumb />
      <label className="mb-4 flex items-center gap-2">
        <input
          ref={selectAllRef}
          type="checkbox"
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
        Zaznacz wszystkie
      </label>

      <div className="flex flex-col gap-3">
        {cart.cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-md border p-3"
          >
            <input
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
            <ProductCardCart
              product={item.product}
              quantity={item.quantity}
              onItemTotalChange={(qty, total) =>
                setItemTotals((prev) => ({
                  ...prev,
                  [item.id]: { qty, total },
                }))
              }
              onRemove={() => handleRemoveItem(item.id)}
            />
          </div>
        ))}
      </div>
      <div className="mt-6 self-end text-right">
        {(() => {
          const grandTotal = cart.cartItems
            .filter((i) => selected.includes(i.id))
            .reduce((sum, i) => {
              const current = itemTotals[i.id];
              const lineTotal = current
                ? current.total
                : i.quantity * i.product.price;
              return sum + lineTotal;
            }, 0);
          return (
            <div className="text-lg font-semibold">
              Suma zaznaczonych: ${grandTotal.toFixed(2)}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
