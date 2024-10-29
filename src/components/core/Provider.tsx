"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@lib/get-query-client";
import { AuthProvider } from "context/AuthContext";
import { ProfileTabProvider } from "context/ProfileTabContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ProfileTabProvider>{children}</ProfileTabProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
