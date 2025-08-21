"use client";
import Loader from "@/components/loader";
import VerifyEmailComponent from "@/components/verify-email";
import { Suspense } from "react";

const VerifyEmail = () => {
  return (
    <Suspense fallback={<Loader />}>
      <VerifyEmailComponent />
    </Suspense>
  );
};

export default VerifyEmail;
