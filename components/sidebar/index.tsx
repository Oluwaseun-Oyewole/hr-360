"use client";
import Logo from "@/assets/logo.svg";
import Logout from "@/assets/logout-03.svg";
import { Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import NavMenuItems from "../navlinks";
import { bottomRoutes, routes } from "./links";
import { Routes } from "./routes";

export const Sidebar = () => {
  return (
    <nav className="hidden font-[300] lg:flex items-center flex-col justify-center">
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

          <li className={`px-3 flex gap-3 items-center cursor-pointer`}>
            <Image src={Logout} alt="logout" />

            <Tooltip title="logout" color={`#380ABB`} className="text-black">
              logout
            </Tooltip>
          </li>
        </ul>
      </div>
    </nav>
  );
};
