import { ProductCardProps } from "@/app/types";
import QuantitySelectorCart from "./QuantitySelectorCart";
import Image from "next/image";
import { showNotification } from "../providers/NotificationProvider";

export default function ProductCardCart({
  product,
  quantity,
  onItemTotalChange,
  onRemove,
  showRemoveButton = true,
  showQuantitySelector = true,
  cartItemId,
}: ProductCardProps & {
  onItemTotalChange?: (quantity: number, total: number) => void;
  onRemove?: () => void;
  showRemoveButton?: boolean;
  showQuantitySelector?: boolean;
  cartItemId?: string;
}) {
  const handleQuantityChange = async (newQuantity: number, newTotal: number) => {
    onItemTotalChange?.(newQuantity, newTotal);
    
    if (cartItemId) {
      try {
        const response = await fetch("/api/cart", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartItemId, quantity: newQuantity }),
        });
        
        if (!response.ok) {
          showNotification({
            type: "error",
            title: "Error",
            message: "Failed to update product quantity",
            duration: 3000,
          });
        }
      } catch (error) {
        showNotification({
          type: "error",
          title: "Error",
          message: "Error occurred while updating cart",
          duration: 3000,
        });
      }
    }
  };

  return (
    <div className="flex items-center gap-4 w-full bg-[#262626] border-1 border-[#383B42] rounded-lg h-full p-6 justify-between">
      <div className="flex space-x-8 h-full">
        <div className="relative w-43 h-35 p-3 bg-[#262626] rounded-xl border-2 border-[#383B42]">
          <div className="relative w-full h-full rounded-md overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col h-full min-h-[140px] justify-between">
          <span className="text-heading-w-7 font-medium">{product.name}</span>
          <div className="inline-block bg-[#E5610A] text-white text-text-s font-medium px-2.5 py-1.5 rounded-md w-fit">
            {product.category?.name || "Unknown"}
          </div>
          <span className="text-heading-w-6 font-medium">${product.price}</span>
        </div>
      </div>

      <div
        className={`flex flex-col h-full ${
          showRemoveButton ? "justify-between" : "justify-end"
        }`}
      >
        {showRemoveButton && (
          <div onClick={onRemove} className="cursor-pointer size-7 self-end">
            <Image
              src={"/delete.svg"}
              alt={product.name}
              height={21}
              width={20}
              className="object-cover"
            />
          </div>
        )}

        {showQuantitySelector ? (
          <div className="flex items-center gap-2">
            <div className="flex border-r-2 px-6 mr-6 border-[#848A97]">
              <span className="self-center text-text-m font-medium text-[#F29145] cursor-pointer">
                Write Note
              </span>
            </div>

            <QuantitySelectorCart
              price={product.price}
              stock={product.stock}
              product={product.id}
              initialQuantity={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        ) : (
          <div className="flex h-full items-end justify-end text-right">
            <p className="text-text-l font-medium">x{quantity || 0}</p>
          </div>
        )}
      </div>
    </div>
  );
}
