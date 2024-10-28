"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@lib/get-query-client";
import { AuthProvider } from "context/AuthContext";
import { ProfileTabProvider } from "context/ProfileTabContext";
import { AdProvider } from "context/AdContext";
import AdComponent from "@components/Ad";

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <AdProvider>
            <AdComponent />

          <ProfileTabProvider>{children}</ProfileTabProvider>
          </AdProvider>
        </AuthProvider>
        
      </QueryClientProvider>
    </>
  );
}
