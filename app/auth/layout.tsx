import { outfit } from "../fonts";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} flex flex-col items-center justify-center h-screen w-full`}
      >
        {children}
      </body>
    </html>
  );
}
