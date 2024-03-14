"use client";
import Logo from "@/assets/logo.svg";
import Logout from "@/assets/logout-03.svg";
import Hr360Modal, { IHr360Modal } from "@/components/modal";
import { Tooltip } from "antd";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Button from "../button";
import NavMenuItems from "../navlinks";
import { bottomRoutes, routes } from "./links";
import { Routes } from "./routes";

export const Sidebar = () => {
  const router = useRouter();
  const modalRef = useRef<IHr360Modal>(null);

  const handleLogoutModal = () => {
    modalRef.current?.open({
      title: "",
      content: (
        <div className="text-center">
          <p className="text-lg pb-3 !font-light">
            Are you sure you want to logout?
          </p>
          <div className="w-full flex items-center justify-center">
            <div className="flex gap-5 pt-6 pb-4 w-[80%] items-center justify-center">
              <Button
                className="!bg-green-700"
                onClick={() => {
                  signOut({ redirect: false });
                  router.push("/auth/login");
                }}
              >
                Yes
              </Button>
              <Button
                className="!bg-red-700"
                onClick={() => modalRef.current?.close()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      ),
    });
  };

  return (
    <nav className="hidden font-[300] lg:flex items-center flex-col justify-center">
      <Hr360Modal ref={modalRef} />

      <div className="w-[87%]">
        <div className="sticky top-0 left-0 z-20 pt-8 pb-12 self-start px-3 bg-[#F5F5F5]">
          <Link
            href={`${Routes.dashboard}`}
            className="flex items-center gap-2"
          >
            <Image src={Logo} alt="icon" className="w-[40px]" />
            <p className="text-xl font-medium">HR.360</p>
          </Link>
        </div>

        <ul className="flex flex-col gap-7">
          {routes?.map((route, index) => {
            return <NavMenuItems key={index} route={route} />;
          })}
        </ul>

        <ul className="pt-16 pb-10 flex flex-col gap-7">
          {bottomRoutes?.map((route, index) => {
            return <NavMenuItems route={route} key={index} />;
          })}

          <li
            className={`px-3 flex gap-3 items-center cursor-pointer`}
            onClick={handleLogoutModal}
          >
            <Image src={Logout} alt="logout" />
            <Tooltip title="logout" color={`#380ABB`}>
              <div className="!text-black cursor-pointer">logout</div>
            </Tooltip>
          </li>
        </ul>
      </div>
    </nav>
  );
};
