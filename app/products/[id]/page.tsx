import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ProductDetailInfo } from "@/app/types";

async function getProduct(id: string): Promise<ProductDetailInfo | null> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/products/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-8 py-8">
        <div className="border-t border-[#383B42] -mx-8 mb-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="relative bg-white rounded-md overflow-hidden aspect-square">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <div className="text-lg">No image available</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="inline-block bg-[#E5610A] text-white text-sm px-3 py-1.5 rounded-md mb-4">
                {product.category.name}
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                {product.name}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-4xl font-bold text-[#F29145]">
                ${product.price.toFixed(2)}
              </div>

              <div className="text-sm text-gray-400">
                Stock: {product.stock} available
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-[#F29145] hover:bg-orange-600 text-black font-medium py-4 px-6 rounded-md transition-colors duration-300">
                Add to Cart
              </button>

              <Link
                href={`/products?category=${product.category.id}`}
                className="block w-full text-center border border-[#F29145] text-[#F29145] hover:bg-[#F29145] hover:text-black font-medium py-4 px-6 rounded-md transition-colors duration-300"
              >
                View Similar Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
