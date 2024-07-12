"use client"
import Button from '@components/buttons/Button'
import React, { useState } from 'react'

export default function ResetPassword() {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault()

    }
    return (
        <div>

            <div className="loginRegisterForgotForm flex items-center justify-center fixed top-0 left-0 z-20 w-full h-screen bg-black/70">
                <section className="max-h-[90vh] overflow-auto p-6 w-full max-w-[400px] bg-zinc-800 rounded-lg">
                    <h2 className="text-white text-[30px] pb-2 flex items-center justify-between">
                        Reset Password
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">

                        <div className="w-full flex flex-col gap-1">
                            <label className="text-white/50">Email</label>
                            <input
                                className="p-2 px-4 rounded-lg bg-white/5 text-white"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div className="w-full flex flex-col gap-1">
                            <label className="text-white/50"> Enter Password</label>
                            <input
                                className="p-2 px-4 rounded-lg bg-white/5 text-white"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-white/50"> Repeat Password</label>
                            <input
                                className="p-2 px-4 rounded-lg bg-white/5 text-white"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </div>


                        {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>} */}

                        <Button type="submit">
                            Reset Password
                        </Button>

                    </form>
                </section>
            </div>
        </div>
    )
}
