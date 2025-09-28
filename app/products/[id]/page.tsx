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

  if (!product) {
    notFound();
  }

  const deliveryDate = getRandomDeliveryDateRange();

  return (
    <>
      <div className="mb-5 ml-4 sm:ml-6 md:ml-8 lg:ml-10 mt-6 sm:mt-8 md:mt-10">
        <Breadcrumb productName={product.name} />
      </div>
      <div className="flex flex-col lg:flex-row p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-0 lg:space-x-8">
        {/* Główna sekcja - zdjęcie i opis */}
        <div className="flex flex-col lg:flex-row w-full lg:w-220 h-auto lg:h-140 space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-0 lg:space-x-10">
          {/* Zdjęcia produktu */}
          <div className="flex flex-col w-full lg:w-full h-auto lg:h-full space-y-6 sm:space-y-8">
            <div className="flex relative h-60 sm:h-70 md:h-80 lg:h-85">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex size-full h-24 sm:h-28 md:h-32 lg:h-1/4 space-x-3 sm:space-x-4">
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

          {/* Opis produktu */}
          <div className="w-full lg:w-full h-full">
            <div className="flex flex-col justify-between h-full space-y-6 sm:space-y-8 lg:space-y-0">
              <div className="flex flex-col">
                <p className="text-heading-m-3 sm:text-heading-m-4 lg:text-heading-w-5 font-medium">
                  {product.name}
                </p>
                <div className="inline-block bg-[#E5610A] text-white text-text-xs sm:text-text-s font-medium px-2.5 py-1.5 rounded-md w-fit mt-3 sm:mt-4 lg:mt-5">
                  <p className="text-text-xs sm:text-text-s font-medium">
                    {product.category.name}
                  </p>
                </div>
                <div className="mt-4 sm:mt-6 lg:mt-8">
                  <p className="text-heading-m-3 sm:text-heading-m-4 lg:text-heading-w-4 font-medium">
                    ${product.price}
                  </p>
                </div>
              </div>

              <div className="mb-4 sm:mb-6 lg:mb-8 mt-4 sm:mt-6 lg:mt-8">
                <ProductDescription description={product.description} />
              </div>
              <div>
                <span className="text-[#B0B0B0] text-text-m sm:text-text-l font-medium">
                  Shipping Available
                </span>
                <div className="flex flex-col w-full sm:w-72 md:w-80 h-18 sm:h-20 md:h-22 border-2 rounded-2xl mt-3 sm:mt-4 lg:mt-5 justify-center items-center gap-1 sm:gap-2 p-2 sm:p-0">
                  <div className="flex">
                    <Image
                      src="/shield-cross.svg"
                      alt="Shield Icon"
                      width={20}
                      height={20}
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                    <span className="text-text-s sm:text-text-m font-medium ml-1 sm:ml-2">
                      DevstockHub Courier
                    </span>
                  </div>

                  <span className="text-text-s sm:text-text-m font-regular text-center">
                    Estimated arrival {deliveryDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sekcja quantity - wyświetla się jako kolumna na dole dla sm i md */}
        <div className="flex-1 flex justify-center lg:justify-center">
          <div className="w-full sm:w-96 md:w-105 lg:w-105 h-fit bg-[#262626] border-[#383B42] border-2 rounded-lg">
            <div className="flex flex-col ml-4 sm:ml-6 mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <span className="text-[#B0B0B0] text-text-m sm:text-text-l font-medium">
                Colors
              </span>
              <ProductColors />
            </div>
            <div className="flex flex-col ml-4 sm:ml-6 mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <QuantitySelector
                price={product.price}
                stock={product.stock}
                product={product.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
