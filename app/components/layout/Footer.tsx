import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#222327] w-full">
      <div className="  flex flex-col md:flex-row justify-between px-4 md:px-10 py-8 gap-8 lg:py-35 lg:px-15">
        {/* Logo + copyright + płatności */}
        <div className="flex flex-col space-y-4 text-center md:text-center  md:justify-center">
          <div className="font-semibold text-2xl lg:text-4xl tracking-tight">
            <span className="text-[#F29145]">Devstock</span>
            <span className="text-white">Hub</span>
          </div>
          <p className="text-text-m font-medium lg:text-base lg:leading-7">
            © {new Date().getFullYear()} DevstockHub. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Image src="/visa.svg" alt="Visa" width={46} height={30} />
            <Image
              src="/mastercard.svg"
              alt="Mastercard"
              width={46}
              height={30}
            />
            <Image src="/paypal.svg" alt="Paypal" width={46} height={30} />
            <Image src="/apple.svg" alt="Apple" width={46} height={30} />
            <Image src="/google.svg" alt="Google" width={46} height={30} />
          </div>
        </div>

        {/* Sekcje linków */}
        <div className="lg:flex  grid grid-cols-2 md:flex-row justify-between gap-8 md:gap-20 md:w-2/3 p-10">
          {/* Company */}
          <div className="flex flex-col space-y-2 text-center">
            <h3 className="text-white font-semibold text-lg lg:text-xl">
              Company
            </h3>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              About Us
            </span>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              Contact
            </span>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              Partner
            </span>
          </div>

          {/* Social */}
          <div className="flex flex-col space-y-2 text-center">
            <h3 className="text-white font-semibold text-lg lg:text-xl">
              Social
            </h3>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              Instagram
            </span>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              Twitter
            </span>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              Facebook
            </span>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              LinkedIn
            </span>
          </div>

          {/* FAQ */}
          <div className="flex flex-col space-y-2 text-center">
            <h3 className="text-white font-semibold text-lg lg:text-xl">FAQ</h3>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              Account
            </span>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              Deliveries
            </span>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              Orders
            </span>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              Payments
            </span>
          </div>

          {/* Resources */}
          <div className="flex flex-col space-y-2 text-center">
            <h3 className="text-white font-semibold text-lg lg:text-xl">
              Resources
            </h3>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              E-books
            </span>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              Tutorials
            </span>
            <span className="text-[#E7E7E7] text-text-m font-medium">
              Course
            </span>
            <span className="text-[#E7E7E7] text-text-m font-medium">Blog</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
