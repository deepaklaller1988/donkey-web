"use client";

import React, { useEffect, useState } from "react";
import Loader from "@components/core/Loader";
import { redirect, useRouter } from "next/navigation";
import User from "@lib/User";

export default function page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);


  return (
    <div>
      <Loader />
    </div>
  );
}
