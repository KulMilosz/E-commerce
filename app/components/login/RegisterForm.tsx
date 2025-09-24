"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerSchema } from "./loginValidation";
import { z } from "zod";

interface LoginFormProps {
  type: "login" | "register";
}

const RegisterForm: React.FC<LoginFormProps> = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const schema = registerSchema;
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        setErrorMessage(result.message || "Błąd rejestracji");
      } else {
        document.cookie = "registered=true; path=/; max-age=5";
        router.push("/register-success");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Błąd sieciowy");
      }
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-3 py-2 border-2 rounded-lg text-text-m focus:outline-none ${
      errors[field]
        ? "border-[#DC2626]"
        : "border-[#616674] focus:border-[#F29145]"
    }`;

  return (
    <div className="w-full h-full p-6 bg-[#262626] border-[#383B42] border-2 rounded-lg text-text-m flex flex-col">
      <h2 className="mb-6 text-heading-w-6 font-medium">Create Account</h2>
      <div
        className={`border-t border-[#383B42] mr-6 ml-6 mt-5 ${
          errorMessage ? "mb-2" : "mb-8"
        }`}
      ></div>

      {errorMessage && <div className="mb-2 text-red-600">{errorMessage}</div>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex-1 flex flex-col"
      >
        <div>
          <label className="block text-text-l font-medium mb-4">Email</label>
          <input
            type="email"
            {...register("email")}
            className={inputClass("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="block mb-4 text-text-l font-medium">
            Mobile Number
          </label>
          <input
            type="text"
            {...register("mobile")}
            className={inputClass("mobile")}
          />
          {errors.mobile && (
            <span className="text-red-500 text-sm">
              {errors.mobile.message}
            </span>
          )}
        </div>

        <div>
          <label className="block mb-4 text-text-l font-medium">Password</label>
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

        <div>
          <label className="block mb-4 text-text-l font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className={inputClass("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div>
          <label className="block mb-4 text-text-l font-medium">
            Country / Region
          </label>
          <select
            {...register("country")}
            className={`${inputClass("country")} bg-[#262626] h-13`}
            defaultValue=""
          >
            <option value="" disabled>
              Select country
            </option>
            <option value="Indonesia">Indonesia</option>
            <option value="Poland">Poland</option>
            <option value="Germany">Germany</option>
          </select>

          {errors.country && (
            <span className="text-red-500 text-sm">
              {errors.country.message}
            </span>
          )}
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            {...register("acceptPolicy")}
            className="w-[26px] h-[26px] mr-2 accent-[#F29145] cursor-pointer"
          />
          <div className="text-sm text-gray-400">
            By creating an account and checking, you agree to the{" "}
            <span className="text-[#F29145] cursor-pointer">
              Conditions of Use
            </span>{" "}
            and{" "}
            <span className="text-[#F29145] cursor-pointer">
              Privacy Notice
            </span>
            .
          </div>
        </div>
        {errors.acceptPolicy && (
          <span className="text-red-500 text-sm">
            {errors.acceptPolicy.message}
          </span>
        )}

        <button
          type="submit"
          className="w-full py-4 text-text-m font-medium bg-[#F29145] text-black rounded-lg mt-4 cursor-pointer"
        >
          Register
        </button>
      </form>

      <div className="mt-4 text-center text-gray-500 text-text-m">
        Do you have an account?{" "}
        <button
          onClick={() => router.push("/login")}
          className="text-text-m font-medium text-[#F29145] cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
