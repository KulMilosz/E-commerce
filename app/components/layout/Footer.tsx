import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#222327] w-full">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start px-2 xs:px-3 sm:px-8 md:px-15 py-4 xs:py-6 sm:py-16 md:py-35 max-w-[1440px] mx-auto gap-4 xs:gap-6 md:gap-0">
        <div className="flex flex-col space-y-4 mb-8 md:mb-0 text-center md:text-left">
          <div className="font-semibold tracking-tight text-xl xs:text-2xl sm:text-3xl lg:text-4xl lg:leading-[46px] lg:tracking-tight">
            <span className="text-[#F29145]">Nexus</span>
            <span className="text-white">Hub</span>
          </div>
          <p className="text-gray-400 text-sm lg:text-base lg:leading-7">
            © 2023 NexusHub. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-4">
            <span className="text-white text-sm">VISA</span>
            <span className="text-white text-sm">Mastercard</span>
            <span className="text-white text-sm">PayPal</span>
            <span className="text-white text-sm">Apple Pay</span>
            <span className="text-white text-sm">Google Pay</span>
          </div>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:flex gap-4 xs:gap-6 md:gap-10 lg:space-x-16">
          <div className="flex flex-col space-y-2 sm:space-y-3">
            <h3 className="text-white font-semibold text-xs xs:text-sm lg:text-xl lg:leading-[30px] lg:tracking-tight">
              Company
            </h3>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              About Us
            </span>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              Contact
            </span>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              Partner
            </span>
          </div>

          <div className="flex flex-col space-y-2 sm:space-y-3">
            <h3 className="text-white font-semibold text-xs xs:text-sm lg:text-xl lg:leading-[30px] lg:tracking-tight">
              Social
            </h3>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              Instagram
            </span>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              Twitter
            </span>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              Facebook
            </span>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              LinkedIn
            </span>
          </div>

          <div className="flex flex-col space-y-2 sm:space-y-3">
            <h3 className="text-white font-semibold text-xs xs:text-sm lg:text-xl lg:leading-[30px] lg:tracking-tight">
              FAQ
            </h3>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              Account
            </span>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              Deliveries
            </span>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              Orders
            </span>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              Payments
            </span>
          </div>

          <div className="flex flex-col space-y-2 sm:space-y-3">
            <h3 className="text-white font-semibold text-xs xs:text-sm lg:text-xl lg:leading-[30px] lg:tracking-tight">
              Resources
            </h3>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              E-books
            </span>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              Tutorials
            </span>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              Course
            </span>
            <span className="text-gray-400 text-xs lg:text-base lg:leading-7">
              Blog
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
