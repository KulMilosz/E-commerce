import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RegisterSuccess() {
  const cookieStore = await cookies();
  const registered = cookieStore.get("registered");

  if (!registered) {
    redirect("/register");
  }

  return (
    <div className="flex flex-col w-full h-fill justify-center items-center mt-28 mb-48 space-y-4 ">
      <div className="flex justify-center items-center w-18 h-18 rounded-full border-4 border-green-400 text-green-400 text-3xl font-bold mb-6 ">
        ✓
      </div>

      <div>
        <h1 className="text-heading-w-1 font-bold">Thank You!</h1>
      </div>
      <div className="flex mb-4">
        <span className="text-heading-w-6 font-medium">
          You have succesfully register
        </span>
      </div>
      <div>
        <span className="text-nowrap text-text-l">
          Please check your e-mail for further information. Let’s exploring our
          products and enjoy many gifts.
        </span>
      </div>
      <div>
        <span className="text-text-l">Having problem? </span>
        <Link
          href="/contact"
          className="cursor-pointer text-text-l text-[#F29145]"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
