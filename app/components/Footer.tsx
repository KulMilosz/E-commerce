import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#222327] w-full">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start px-2 xs:px-3 sm:px-8 md:px-15 py-4 xs:py-6 sm:py-16 md:py-35 max-w-[1440px] mx-auto gap-4 xs:gap-6 md:gap-0">
        <div className="flex flex-col space-y-4 mb-8 md:mb-0 text-center md:text-left">
          <div className="font-semibold tracking-tight text-xl xs:text-2xl sm:text-3xl lg:text-4xl lg:leading-[46px] lg:tracking-tight">
            <span className="text-[#F29145]">Nexus</span>
            <span className="text-white">Hub</span>
          </div>
          <p className="text-gray-400 text-sm lg:text-base lg:leading-[26px]">© 2023 NexusHub. All rights reserved.</p>
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
            <h3 className="text-white font-semibold text-xs xs:text-sm lg:text-xl lg:leading-[30px] lg:tracking-tight">Company</h3>
            <Link href="/about" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">About Us</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">Contact</Link>
            <Link href="/partner" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">Partner</Link>
          </div>

          <div className="flex flex-col space-y-2 sm:space-y-3">
            <h3 className="text-white font-semibold text-xs xs:text-sm lg:text-xl lg:leading-[30px] lg:tracking-tight">Social</h3>
            <Link href="/instagram" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">Instagram</Link>
            <Link href="/twitter" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">Twitter</Link>
            <Link href="/facebook" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">Facebook</Link>
            <Link href="/linkedin" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">LinkedIn</Link>
          </div>

          <div className="flex flex-col space-y-2 sm:space-y-3">
            <h3 className="text-white font-semibold text-xs xs:text-sm lg:text-xl lg:leading-[30px] lg:tracking-tight">FAQ</h3>
            <Link href="/account" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">Account</Link>
            <Link href="/deliveries" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">Deliveries</Link>
            <Link href="/orders" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">Orders</Link>
            <Link href="/payments" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">Payments</Link>
          </div>

          <div className="flex flex-col space-y-2 sm:space-y-3">
            <h3 className="text-white font-semibold text-xs xs:text-sm lg:text-xl lg:leading-[30px] lg:tracking-tight">Resources</h3>
            <Link href="/ebooks" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">E-books</Link>
            <Link href="/tutorials" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">Tutorials</Link>
            <Link href="/course" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">Course</Link>
            <Link href="/blog" className="text-gray-400 hover:text-white text-xs lg:text-base lg:leading-[26px]">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;