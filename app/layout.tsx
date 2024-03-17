"use client";
import { AppStore, store } from "@/lib/store";
import { ConfigProvider } from "antd";
import { useRef } from "react";
import { Toaster } from "react-hot-toast";
import { Provider as Providers } from "react-redux";
import { outfit } from "./fonts";
import "./globals.css";
import Provider from "./provider/layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
  }

  return (
    <html lang="en">
      <head>
        <title>hr360</title>
        <meta name="hr360" content="hr360 dashboard" />
      </head>
      <Providers store={storeRef.current}>
        <body className={`${outfit.className}`}>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: `${outfit}`,
              },
              components: {
                Table: {
                  headerBg: "#F5F5F5",
                  rowHoverBg: "rgba(0,0,0,0.02)",
                  colorText: "#000",
                  borderColor: "rgba(0,0,0,0.1)",
                  boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
                },
              },
            }}
          >
            <Provider>{children}</Provider>
          </ConfigProvider>
          <Toaster position="top-center" />
        </body>
      </Providers>
    </html>
  );
}
