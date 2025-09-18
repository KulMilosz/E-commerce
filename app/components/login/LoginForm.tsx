"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { z } from "zod";
import { loginSchema } from "./loginValidation";

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
    mode: "onSubmit",
  });

  const handleEmailSubmit = (data: LoginFormData) => {
    if (!data.emailOrMobile) {
      setErrorMessage("Please enter your email or mobile.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!emailRegex.test(data.emailOrMobile) && !phoneRegex.test(data.emailOrMobile)) {
      setErrorMessage("Email or Phone Number is not valid.");
      return;
    }

    setErrorMessage(null);
    setEmailOrMobile(data.emailOrMobile);
    setStep("password");
    reset({ emailOrMobile: data.emailOrMobile, password: "" });
  };

  const handlePasswordSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);

    if (!data.password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      const result = await signIn("credentials", {
        emailOrMobile: emailOrMobile,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage("Email/Phone Number or Password Incorrect");
        setStep("email");
        reset();
        return;
      }

      if (result?.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Network error. Please try again.");
      setStep("email");
      reset();
    }
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
          <>
            <input type="hidden" {...register("emailOrMobile")} value={emailOrMobile} />
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
          </>
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

      <div className="mt-4 text-center text-gray-500 text-text-m">
        {"Don't have an account?"}{" "}
        <button
          onClick={() => router.push("/register")}
          className="text-text-m font-medium text-[#F29145] cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
