"use client";
import Header from "@/components/header";
import Loader from "@/components/loader";
import { Sidebar } from "@/components/sidebar";
import { PageTitle } from "@/utils/constants";
import { Breadcrumb } from "antd";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { LuDot } from "react-icons/lu";
import { outfit } from "../fonts";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
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
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      }
    >
      <div
        className={`${outfit.className} grid grid-flow-col grid-cols-[100%] lg:grid-cols-[18%_82%]`}
      >
        <div className="hidden lg:block bg-[#F5F5F5] h-screen overflow-y-scroll">
          <Sidebar />
        </div>

        <div className="h-screen overflow-y-scroll w-full mx-auto font-light px-8 md:px-12">
          <div
            className="sticky top-0 left-0 bg-white
         z-50"
          >
            <Header role={session?.data?.user?.role!} />
          </div>
          <p className="font-medium text-xl">
            {PageTitle[getTitleEnum as keyof typeof PageTitle]}
          </p>
          <div className="flex justify-between items-center py-4">
            <Breadcrumb
              className="flex items-center py-4 !text-sm"
              items={[
                {
                  title: <Link href="/dashboard">Dashboard</Link>,
                },
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
            <p className="text-sm">{currentDateTime}</p>
          </div>

          {children}
        </div>
      </div>
    </Suspense>
  );
}
