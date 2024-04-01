import Logo from "@/assets/logo.svg";
import Image from "next/image";
import { outfit } from "../fonts";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`${outfit.className} `}>
      <header className="flex items-center justify-center gap-2 py-3">
        <Image src={Logo} alt="" className="w-5 h-5" />
        <p>Hr360</p>
      </header>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        {children}
      </div>
    </main>
  );
}
