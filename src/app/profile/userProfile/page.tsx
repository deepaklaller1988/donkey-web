"use client";
import React, { useEffect, useState } from "react";
import User from "@lib/User";
import { useMutation } from "@tanstack/react-query";
import API from "@lib/Api";
import { toasterError, toasterSuccess } from "@components/core/Toaster";
import { useProfileTab } from "context/ProfileTabContext";

export default function UserProfile() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const { setUsername } = useProfileTab();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDetails = await User.role();
        if (userDetails) {
          setUsername(userDetails.username)
          setUserData({
            username: userDetails.username,
            email: userDetails.email,
            newPassword: "",
            confirmNewPassword: "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
    if (!showChangePassword) {
      setUserData({ ...userData, newPassword: "", confirmNewPassword: "" });
    }
  };

  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      if (!showChangePassword) {
        return;
      }
      const data = Object.fromEntries(formData.entries());
      return await API.post("user/update-userdetail", {
        userId: User.id,
        newPassword: userData.newPassword,
        newUsername: userData.username,
      });
    },
    onSuccess: (data: any) => {
      setShowChangePassword(false);
      setUsername(userData.username);
      User.username = userData.username;
      toasterSuccess("Profile updated successfully", 3000, "id");
      setIsSaveButtonEnabled(false);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toasterError("Error updating password", 3000, "id");
    },
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setIsSaveButtonEnabled(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { newPassword, confirmNewPassword, username } = userData;

    if (!username) {
      toasterError("Username is Required.", 3000, "id");
      return;
    }

    if (showChangePassword) {
      if (newPassword.length < 6 || newPassword !== confirmNewPassword) {
        toasterError(
          "Password must be at least 6 characters long and both passwords must match.",
          3000,
          "id"
        );
        return;
      }
    }

    mutation.mutate(new FormData(event.target));
  };

  return (
    <div>
      <div className="w-full mt-28">
        <div className='homewrapper'>
        <div className="w-full max-w-[500px] rounded-lg bg-black/50 m-auto p-10">
          <h2 className="text-white text-[30px] pb-2 flex items-center justify-between">
            Info{" "}
          </h2>
          <form
            className="flex items-start flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col gap-1">
              <label className="text-white/50">Username</label>
              <input
                className="p-2 px-4 rounded-lg bg-white/5 text-white"
                name="username"
                value={userData.username}
                onChange={handleChange}
                type="text"
                placeholder="Username or Email"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-white/50">Email</label>
              <input
                className="p-2 px-4 rounded-lg bg-white/5 text-white"
                name="email"
                value={userData.email}
                readOnly
                type="text"
                placeholder="Your Email"
              />
            </div>

            <button
              className="text-left p-1 px-4 rounded-lg bg-white/5 text-white mt-1"
              type="button"
              onClick={toggleChangePassword}
            >
              Change Password
            </button>

            {showChangePassword && (
              <>
                <div className="w-full flex flex-col gap-1">
                  <label className="text-white/50">New Password</label>
                  <input
                    className="p-2 px-4 rounded-lg bg-white/5 text-white"
                    name="newPassword"
                    value={userData.newPassword}
                    onChange={handleChange}
                    type="password"
                    placeholder="New Password"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label className="text-white/50">Confirm New Password</label>
                  <input
                    className="p-2 px-4 rounded-lg bg-white/5 text-white"
                    name="confirmNewPassword"
                    value={userData.confirmNewPassword}
                    onChange={handleChange}
                    type="password"
                    placeholder="Confirm New Password"
                  />
                </div>
              </>
            )}

            <div className="w-full mt-3 text-center">
              <button
                className="py-2 px-4 w-full rounded-lg bg-white/5 text-black font-semibold bg-[#FFA500] text-lg"
                type="submit"
                disabled={
                  !isSaveButtonEnabled ||
                  (showChangePassword &&
                    (!userData.newPassword || !userData.confirmNewPassword))
                }
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}
