"use client";

import React, { useEffect, useState } from "react";
import Loader from "@components/core/Loader";
import { redirect, useRouter } from "next/navigation";
import User from "@lib/User";

export default function page() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/dashboard");
  // }, []);

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await User.role(); // Call the async method to fetch user details
        setUserData({
          id: User.id,
          email: User.email,
          username: User.username,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    console.log(userData, "user");

    fetchUserData();
  }, []);
  return (
    <div>
      <Loader />
    </div>
  );
}
