"use client";
import { AppStore, store } from "@/lib/store";
import { ConfigProvider } from "antd";
import { useRef } from "react";
import { Provider } from "react-redux";
import { outfit } from "./fonts";
import "./globals.css";

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
      <body className={`${outfit.className}`}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: `${outfit}`,
              fontWeightStrong: 300,
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
          <Provider store={storeRef.current}> {children}</Provider>
        </ConfigProvider>
      </body>
    </html>
  );
}
