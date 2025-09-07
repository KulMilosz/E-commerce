import Image from "next/image";
import Link from "next/link";

const CartButton = () => {
  return (
    <Link href="/cart" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
      <Image src="/Cart.svg" alt="Cart" width={24} height={24} className="text-white" />
    </Link>
  );
};

export default CartButton;
