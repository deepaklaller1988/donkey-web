"use client";

import React, { useEffect, useState } from "react";
import Loader from "@components/core/Loader";
import {  useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/dashboard");
  // }, []);


  return (
    <div>
      <Loader />
    </div>
  );
}
