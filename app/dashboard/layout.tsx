"use client";
import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { PageTitle } from "@/utils/constants";
import { Breadcrumb } from "antd";
import moment from "moment";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuDot } from "react-icons/lu";
import { outfit } from "../fonts";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const getTitle = pathname.split("/");
  let getTitleEnum = getTitle[getTitle.length - 1];
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      // const dateTimeString = moment().format("MMMM Do YYYY, h:mm a");
      const dateTimeString = moment().format("MMMM Do YYYY");
      setCurrentDateTime(dateTimeString);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${outfit.className} grid grid-flow-col grid-cols-[100%] lg:grid-cols-[16%_84%]`}
    >
      <div className="hidden lg:block bg-[#F5F5F5] h-screen overflow-y-scroll">
        <Sidebar />
      </div>

      <div className="h-screen overflow-y-scroll px-6 font-light">
        <div className="sticky top-0 left-0 bg-white z-50">
          <Header />
        </div>
        <p className="font-medium text-xl">
          {PageTitle[getTitleEnum as keyof typeof PageTitle]}
        </p>
        <div className="flex justify-between items-center">
          <Breadcrumb
            className="flex items-center py-4 !text-xs"
            items={[
              {
                title: <Link href="/dashboard">Dashboard</Link>,
              },
              // {
              //   title: (
              //     <button disabled className="disabled:cursor-not-allowed">
              //       {PageTitle[getTitleEnum as keyof typeof PageTitle]}
              //     </button>
              //   ),
              // },
              {
                title: (
                  <p className="text-primary-100">
                    {pathname
                      .split("/")
                      [getTitle.length - 1].substring(0, 1)
                      .toUpperCase() +
                      pathname.split("/")[getTitle.length - 1].substring(1)}
                  </p>
                ),
              },
            ]}
            separator={<LuDot className="mt-0 text-xl" />}
          />
          {currentDateTime}
        </div>

        {children}
      </div>
    </div>
  );
}
