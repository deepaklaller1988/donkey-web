"use client";

import React, { useEffect, useState } from "react";
import Loader from "@components/core/Loader";

export default function page() {

  // useEffect(() => {
  //   router.push("/dashboard");
  // }, []);
  useEffect(() => {
    // Check if there's anything in local storage
    if (localStorage.length > 0) {
      // Set a timer to clear local storage after 2 minutes (120,000 ms)
      const timer = setTimeout(() => {
        localStorage.clear();
        console.log("Local storage cleared after 2 minutes");
      }, 60000);

      // Clean up the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <div>
      <Loader />
    </div>
  );
}
