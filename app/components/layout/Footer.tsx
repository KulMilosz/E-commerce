import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#222327] w-full">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start px-2 xs:px-3 sm:px-8 md:px-15 py-4 xs:py-6 sm:py-16 md:py-35 max-w-[1440px] mx-auto gap-4 xs:gap-6 md:gap-0">
        <div className="flex flex-col space-y-4 mb-8 md:mb-0 text-center md:text-left">
          <div className="font-semibold tracking-tight text-heading-w-3 xs:text-2xl sm:text-3xl lg:text-4xl lg:leading-[46px] lg:tracking-tight">
            <span className="text-[#F29145]">Devstock</span>
            <span className="text-white">Hub</span>
          </div>
          <p className=" text-text-m font-medium lg:text-base lg:leading-7">
            © {new Date().getFullYear()} DevstockHub. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-4">
            <Image
              src="/visa.svg"
              alt="Visa Payment Method"
              width={46}
              height={30}
            />
            <Image
              src="/mastercard.svg"
              alt="Mastercard Payment Method"
              width={46}
              height={30}
            />
            <Image
              src="/paypal.svg"
              alt="Paypal Payment Method"
              width={46}
              height={30}
            />
            <Image
              src="/apple.svg"
              alt="Apple Payment Method"
              width={46}
              height={30}
            />
            <Image
              src="/google.svg"
              alt="Google Payment Method"
              width={46}
              height={30}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:flex gap-4 xs:gap-6 md:gap-10 lg:space-x-16">
          <div className="flex flex-col space-y-2 sm:space-y-3">
            <h3 className="text-white font-semibold text-heading-w-7 lg:leading-[30px] lg:tracking-tight">
              Company
            </h3>
            <span className="text-gray-400 text-text-m font-medium lg:leading-7">
              About Us
            </span>
            <span className="text-gray-400 text-text-m font-medium lg:leading-7">
              Contact
            </span>
            <span className="text-gray-400 text-text-m font-medium lg:leading-7">
              Partner
            </span>
          </div>

          <div className="flex flex-col space-y-2 sm:space-y-3">
            <h3 className="text-white font-semibold text-heading-w-7  lg:leading-[30px] lg:tracking-tight">
              Social
            </h3>
            <span className="text-gray-400 text-text-m font-medium  lg:leading-7">
              Instagram
            </span>
            <span className="text-gray-400 text-text-m font-medium  lg:leading-7">
              Twitter
            </span>
            <span className="text-gray-400 text-text-m font-medium  lg:leading-7">
              Facebook
            </span>
            <span className="text-gray-400 text-text-m font-medium  lg:leading-7">
              LinkedIn
            </span>
          </div>

          <div className="flex flex-col space-y-2 sm:space-y-3">
            <h3 className="text-white font-semibold text-heading-w-7  lg:leading-[30px] lg:tracking-tight">
              FAQ
            </h3>
            <span className="text-gray-400 text-text-m font-medium  lg:leading-7">
              Account
            </span>
            <span className="text-gray-400 text-text-m font-medium  lg:leading-7">
              Deliveries
            </span>
            <span className="text-gray-400 text-text-m font-medium  lg:leading-7">
              Orders
            </span>
            <span className="text-gray-400 text-text-m font-medium  lg:leading-7">
              Payments
            </span>
          </div>

          <div className="flex flex-col space-y-2 sm:space-y-3">
            <h3 className="text-white font-semibold text-xs xs:text-sm lg:text-xl lg:leading-[30px] lg:tracking-tight">
              Resources
            </h3>
            <span className="text-gray-400 text-text-m font-medium  lg:leading-7">
              E-books
            </span>
            <span className="text-gray-400 text-text-m font-medium  lg:leading-7">
              Tutorials
            </span>
            <span className="text-gray-400 text-text-m font-medium  lg:leading-7">
              Course
            </span>
            <span className="text-gray-400 text-text-m font-medium  lg:leading-7">
              Blog
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
