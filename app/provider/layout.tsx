"use client";
import ProgressLoader from "@/components/NProgress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ProgressLoader />
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
