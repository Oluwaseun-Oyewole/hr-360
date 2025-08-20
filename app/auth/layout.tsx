import GoBack from "@/components/back";
import ProgressLoader from "@/components/NProgress";
import { outfit } from "../fonts";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`${outfit.className}`}>
      <ProgressLoader />
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <GoBack />
        {children}
      </div>
    </main>
  );
}
