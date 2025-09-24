import { ProductCardProps } from "@/app/types";
import QuantitySelectorCart from "./QuantitySelectorCart";

export default function ProductCardCart(
  {
    product,
    quantity,
    onItemTotalChange,
    onRemove,
  }: ProductCardProps & {
    onItemTotalChange?: (quantity: number, total: number) => void;
    onRemove?: () => void;
  }
) {
  return (
    <div className="flex items-center gap-4 w-full">
      {product.name}
      {product.category.name}
      {product.price}
      <div>{product.stock.toFixed()}</div>
      <QuantitySelectorCart
        price={product.price}
        stock={product.stock}
        product={product.id}
        initialQuantity={quantity}
        onChange={onItemTotalChange}
      />
      <button onClick={onRemove} className="ml-auto text-red-500">Usuń</button>
    </div>
  );
}
