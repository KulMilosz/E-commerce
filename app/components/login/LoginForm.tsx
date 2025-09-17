"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { loginSchema } from "./loginValidation";

// Schemat Zod

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "password">("email");
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const handleEmailSubmit = (data: LoginFormData) => {
    setErrorMessage(null);
    setEmailOrMobile(data.emailOrMobile);
    setStep("password");
    reset({ emailOrMobile: data.emailOrMobile });
  };

  const handlePasswordSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);

    // Tu normalnie wysyłasz do API i sprawdzasz dane
    const isValidUser = true; // <- przykładowo, bez backendu
    if (!isValidUser) {
      setErrorMessage("Email/Phone Number or Password Incorrect");
      setStep("email");
      reset();
      return;
    }

    // Jeśli wszystko OK
    router.push("/dashboard"); // np. po zalogowaniu
  };

  const inputClass = (field: keyof LoginFormData) =>
    `w-full px-3 py-2 border-2 rounded-lg text-text-m focus:outline-none ${
      errors[field]
        ? "border-[#DC2626]"
        : "border-[#616674] focus:border-[#F29145]"
    }`;

  return (
    <div className="w-full h-full p-6 bg-[#262626] border-[#383B42] border-2 rounded-lg text-text-m flex flex-col">
      <h2 className="mb-6 text-heading-w-6 font-medium">
        {step === "email" ? "Sign In" : "Enter Password"}
      </h2>
      <div className="border-t border-[#383B42] mr-6 ml-6 mt-5 mb-8"></div>

      <form
        onSubmit={handleSubmit(
          step === "email" ? handleEmailSubmit : handlePasswordSubmit
        )}
        className="space-y-4 flex-1 flex flex-col"
      >
        {step === "email" && (
          <div>
            <label className="block text-text-l font-medium mb-2">
              Email or Mobile
            </label>
            <input
              type="text"
              {...register("emailOrMobile")}
              className={inputClass("emailOrMobile")}
            />
            {errors.emailOrMobile && (
              <span className="text-red-500 text-sm">
                {errors.emailOrMobile.message}
              </span>
            )}
          </div>
        )}

        {step === "password" && (
          <div>
            <label className="block text-text-l font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className={inputClass("password")}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
        )}

        {errorMessage && (
          <span className="text-red-500 text-sm">{errorMessage}</span>
        )}

        <button
          type="submit"
          className="w-full py-4 text-text-m font-medium bg-[#F29145] text-black rounded-lg mt-4 cursor-pointer"
        >
          {step === "email" ? "Continue" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
