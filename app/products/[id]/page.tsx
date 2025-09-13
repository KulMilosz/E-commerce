import { notFound } from "next/navigation";
import { getProduct } from "@/app/services/singleProductService";
import ProductDescription from "@/app/components/products/ProductDescription";
import { getRandomDeliveryDateRange } from "@/app/lib/date";
import Image from "next/image";
import Breadcrumb from "@/app/components/layout/Breadcrumb";
import ProductColors from "@/app/components/products/ProductColors";
import QuantitySelector from "@/app/components/products/QuantitySelector";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  console.log(product);

  if (!product) {
    notFound();
  }

  const deliveryDate = getRandomDeliveryDateRange();

  return (
    <>
      <div className="mb-5 ml-10 mt-10">
        <Breadcrumb productName={product.name} />
      </div>
      <div className="flex p-10 space-x-8">
        <div className="flex w-220 h-140 space-x-10">
          <div className=" flex flex-col w-full h-full space-y-8">
            <div className="flex relative h-85">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex size-full h-1/4 space-x-4">
              <div className="flex relative h-full w-1/3 cursor-pointer">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex relative h-full w-1/3 cursor-pointer">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex relative h-full w-1/3 cursor-pointer">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col ">
                <p className="text-heading-w-5 font-medium">{product.name}</p>
                <div className="inline-block bg-[#E5610A] text-white text-text-s font-medium px-2.5 py-1.5 rounded-md w-fit mt-5">
                  <p className="text-text-s font-medium">
                    {product.category.name}
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-heading-w-4 font-medium">
                    ${product.price}
                  </p>
                </div>
              </div>

              <div className="mb-8 mt-8">
                <ProductDescription description={product.description} />
              </div>
              <div>
                <span className="text-[#B0B0B0] text-text-l font-medium">
                  Shipping Available
                </span>
                <div className="flex flex-col w-80 h-22 border-2 rounded-2xl mt-5 justify-center items-center gap-2">
                  <div className="flex ">
                    <Image
                      src="/shield-cross.svg"
                      alt="Shield Icon"
                      width={24}
                      height={24}
                    />
                    <span className="text-text-m font-medium">
                      NexusHub Courier
                    </span>
                  </div>

                  <span className="text-text-m font-regular">
                    Estimated arrival {deliveryDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-105 h-fit bg-[#262626] border-[#383B42] border-2 rounded-lg">
            <div className="flex flex-col ml-6 mt-6 space-y-4 ">
              <span className="text-[#B0B0B0] text-text-l font-medium">
                Colors
              </span>
              <ProductColors />
            </div>
            <div className="flex flex-col ml-6 mt-6 space-y-4 ">
              <QuantitySelector price={product.price} stock={product.stock} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
