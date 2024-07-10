"use client"
import ProfileTab from '@components/core/ProfileTab';
import React, { useState } from 'react'


export default function UserProfile() {
    const [showChangePassword, setShowChangePassword] = useState(false);

    const toggleChangePassword = () => {
        setShowChangePassword(!showChangePassword);
    };
    return (
        <div>
            <ProfileTab activeTab="profile"/>

            <div className="w-full mt-28">
                <div className="w-full max-w-[500px] rounded-lg bg-black/50 m-auto p-10">
                        <h2 className="text-white text-[30px] pb-2 flex items-center justify-between">Info </h2>
                        <form className="flex items-start flex-col gap-2">
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-white/50">Username</label>
                                <input className="p-2 px-4 rounded-lg bg-white/5 text-white" type="text" placeholder="Username or Email" />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-white/50">Email</label>
                                <input className="p-2 px-4 rounded-lg bg-white/5 text-white" type="text" placeholder="Your Email" />
                            </div>

                            <button className="text-left p-2 px-4 rounded-lg bg-white/5 text-white mt-1" type="button" onClick={toggleChangePassword}>Change Password</button>

                            {showChangePassword && (
                                <>
                                    <div className="w-full flex flex-col gap-1">
                                        <label className="text-white/50">New Password</label>
                                        <input className="p-2 px-4 rounded-lg bg-white/5 text-white" type="text" placeholder="New Password" />
                                    </div>
                                    <div className="w-full flex flex-col gap-1">
                                        <label className="text-white/50">Confirm New Password</label>
                                        <input className="p-2 px-4 rounded-lg bg-white/5 text-white" type="text" placeholder="Confirm New Password" />
                                    </div>
                                </>
                            )}

                            <div className="w-full mt-2 text-center pbgColor px-6 py-2 rounded-full transition">
                                <button>Save Changes</button>
                            </div>

                        </form>
                </div>
            </div>
        </div>
    )
}
