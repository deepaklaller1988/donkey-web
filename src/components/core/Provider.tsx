'use client'
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@lib/get-query-client";

export default function Provider({children} : {children: React.ReactNode}){
    const queryClient = getQueryClient();

    return(
        <>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        </>
    )
}