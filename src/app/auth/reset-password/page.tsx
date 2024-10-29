"use client";
import Button from "@components/buttons/Button";
import API from "@lib/Api";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toasterError, toasterSuccess } from "@components/core/Toaster";
import { handleError } from "@lib/errorHandler";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchToken = searchParams.get("token");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const data: any = {
        password: formData.password.trim(),
        token: searchToken,
      };
      return await API.post("user/reset-password", data);
    },
    onSuccess: (data) => {
      if (data?.message) {
        setSuccessMessage(data.message);
        router.push("/home");
        toasterSuccess("Password Reset SuccessFully !!", 3000, "id");
      }
    },
    onError: (error: any) => {
      const message = handleError(error?.error?.code);
      toasterError(message, 3000, "id");
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(event.target);
    const password: any = formData.get("password")?.toString().trim();
    const repeatPassword = formData.get("repeatPassword")?.toString().trim();

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    mutation.mutate({ password });
  };

  return (
    <div className="loginRegisterForgotForm flex items-center justify-center fixed top-0 left-0 z-20 w-full h-screen bg-black/70">
      <section className="max-h-[90vh] overflow-auto p-6 w-full max-w-[400px] bg-zinc-800 rounded-lg">
        <h2 className="text-white text-[30px] pb-2 flex items-center justify-between">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="w-full flex flex-col gap-1">
            <label className="text-white/50">Enter Password</label>
            <input
              className="p-2 px-4 rounded-lg bg-white/5 text-white"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1 mb-4">
            <label className="text-white/50">Repeat Password</label>
            <input
              className="p-2 px-4 rounded-lg bg-white/5 text-white"
              type="password"
              name="repeatPassword"
              placeholder="Repeat Password"
              required
            />
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <Button type="submit">Reset Password</Button>
        </form>
      </section>
    </div>
  );
}
