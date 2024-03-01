import { ConfigProvider } from "antd";
import { outfit } from "../fonts";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: `${outfit}`,
              fontWeightStrong: 300,
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
