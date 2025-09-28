"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Breadcrumb from "../components/layout/Breadcrumb";
import { showNotification } from "../components/providers/NotificationProvider";
import { contactSchema } from "../components/login/loginValidation";
import { ContactFormData } from "../types";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = () => {
    showNotification({
      type: "success",
      title: "Sukces",
      message: "Message has been sent successfully!",
      duration: 3000,
    });

    reset();
  };

  return (
    <div className="flex flex-col pb-20 pt-10">
      <Breadcrumb />

      <div className="mt-8">
        <h1 className="lg:text-heading-w-4 text-heading-m-4 font-medium mb-8 text-[#E7E7E7] text-center">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 w-full max-w-6xl mx-auto">
          {/* Lewa kolumna - Get in Touch */}
          <div className="bg-[#222327] border border-[#383B42] rounded-md p-6 flex flex-col w-full">
            <h2 className="lg:text-heading-w-6 text-heading-m-6 font-medium mb-4 text-[#E7E7E7] pb-6 text-center">
              Get in Touch
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center items-start w-full">
              <div className="space-y-4">
                <div>
                  <h3 className="text-text-m font-medium text-[#F29145] mb-2">
                    Email
                  </h3>
                  <p className="text-text-l text-[#E7E7E7]">
                    contact@ecommerce.com
                  </p>
                </div>
                <div>
                  <h3 className="text-text-m font-medium text-[#F29145] mb-2">
                    Phone
                  </h3>
                  <p className="text-text-l text-[#E7E7E7]">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-text-m font-medium text-[#F29145] mb-2">
                  Address
                </h3>
                <p className="text-text-l text-[#E7E7E7]">
                  123 Tech Street
                  <br />
                  Digital City, DC 12345
                  <br />
                  United States
                </p>
              </div>
            </div>
          </div>

          {/* Prawa kolumna - Business Hours */}
          <div className="bg-[#222327] border border-[#383B42] rounded-md p-6 flex flex-col w-full">
            <h2 className="lg:text-heading-w-6 text-heading-m-6 font-medium mb-4 text-[#E7E7E7] pb-5 text-center">
              Business Hours
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between gap-4">
                <span className="text-text-m text-[#E7E7E7]">
                  Monday - Friday
                </span>
                <span className="text-text-m text-[#F29145]">
                  9:00 AM - 6:00 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-m text-[#E7E7E7]">Saturday</span>
                <span className="text-text-m text-[#F29145]">
                  10:00 AM - 4:00 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-m text-[#E7E7E7]">Sunday</span>
                <span className="text-text-m text-[#F29145]">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formularz */}
        <div className="mt-8 bg-[#222327] border border-[#383B42] rounded-md p-6 max-w-4xl mx-auto">
          <h2 className="lg:text-heading-w-6 text-heading-m-6 font-medium mb-4 text-[#E7E7E7] text-center">
            Send us a Message
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-m font-medium text-[#E7E7E7] mb-2">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  className="w-full bg-[#262626] border border-[#616674] rounded-md px-4 py-2 text-[#E7E7E7] focus:outline-none focus:border-[#F29145]"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-text-m font-medium text-[#E7E7E7] mb-2">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full bg-[#262626] border border-[#616674] rounded-md px-4 py-2 text-[#E7E7E7] focus:outline-none focus:border-[#F29145]"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-text-m font-medium text-[#E7E7E7] mb-2">
                Subject
              </label>
              <input
                {...register("subject")}
                type="text"
                className="w-full bg-[#262626] border border-[#616674] rounded-md px-4 py-2 text-[#E7E7E7] focus:outline-none focus:border-[#F29145]"
                placeholder="Message subject"
              />
              {errors.subject && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-text-m font-medium text-[#E7E7E7] mb-2">
                Message
              </label>
              <textarea
                {...register("message")}
                rows={4}
                className="w-full bg-[#262626] border border-[#616674] rounded-md px-4 py-2 text-[#E7E7E7] focus:outline-none focus:border-[#F29145] resize-none"
                placeholder="Your message here..."
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#F29145] hover:bg-[#E5610A] text-black font-medium px-8 py-3 rounded-md transition-colors duration-300 cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
