"use client";
import { outfit } from "@/app/fonts";
import Button from "@/components/button";
import { login_redirect } from "@/routes";
import classNames from "classnames";
import { signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`${outfit.className} flex flex-col items-center justify-center h-screen w-full`}
    >
      {children}

      <div
        className={classNames("w-[80%] lg:w-[40%] flex flex-col gap-3 py-10")}
      >
        <Button
          className="!bg-white !text-black flex items-center justify-center !border-[2px] !border-gray-200 !text-sm"
          onClick={() => signIn("github", { callbackUrl: login_redirect })}
        >
          <BsGithub className="text-xl" /> Continue with Github
        </Button>
        <Button
          className="!text-black flex items-center justify-center !border-[2px] !border-gray-200 !text-sm"
          onClick={() => signIn("google", { callbackUrl: login_redirect })}
        >
          <FcGoogle className="text-2xl" /> Continue with Google
        </Button>
      </div>
    </main>
  );
}
