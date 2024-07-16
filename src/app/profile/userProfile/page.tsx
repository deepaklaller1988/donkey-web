"use client"
import React, { useState } from 'react';
import ProfileTab from '@components/core/ProfileTab';
import User from '@lib/User'; 
import { useMutation } from '@tanstack/react-query';
import API from '@lib/Api';

export default function UserProfile() {
    const id = User.id
    const [userData, setUserData] = useState({
        username: User.username || '',
        email: User.email || '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [showChangePassword, setShowChangePassword] = useState(false);

    const toggleChangePassword = () => {
        setShowChangePassword(!showChangePassword);
    };

    const mutation = useMutation({
        mutationFn: async (formData: any) => {
            const data = Object.fromEntries(formData.entries());
            return await API.post("user/update-userdetail", { userId: id, newPassword: userData.newPassword, newUsername: userData.username });
        },
        onSuccess: (data: any) => {
            console.log(data.data, "data");
            setShowChangePassword(false)
            // Handle success if needed
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        },
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        mutation.mutate(new FormData(event.target));
    };

    const handleSaveChanges = async () => {
        try {
            const { newPassword, confirmNewPassword, username } = userData;

            if (newPassword !== confirmNewPassword) {
                console.error('Passwords do not match.');
                return;
            }

            const data = {
                userId: User.id,
                newPassword,
                newUsername: username,
            };

            // Example of updating user details
            const response = await API.post('update-user', data);
            console.log('User details updated:', response.data);
        } catch (error) {
            console.error('Error updating user details:', error);
        }
    };

    return (
        <div>
            <ProfileTab activeTab="profile" />
            <div className="w-full mt-28">
                <div className="w-full max-w-[500px] rounded-lg bg-black/50 m-auto p-10">
                    <h2 className="text-white text-[30px] pb-2 flex items-center justify-between">Info </h2>
                    <form className="flex items-start flex-col gap-2" onSubmit={handleSubmit}>
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

                        <div className="w-full mt-2 text-center">
                            <button className="p-1 px-4 rounded-lg bg-white/5 text-white" type="submit">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
