'use client'
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@lib/get-query-client";
import { AuthProvider } from "context/AuthContext";

export default function Provider({children} : {children: React.ReactNode}){
    const queryClient = getQueryClient();

    return(
        <>
        <QueryClientProvider client={queryClient}>
        <AuthProvider>
            {children}
        </AuthProvider>
        </QueryClientProvider>
        </>
    )
}