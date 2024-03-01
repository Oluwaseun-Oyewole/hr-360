"use client";
import Dropdowns from "@/assets/arrow-down-01-round.svg";
import Profile from "@/assets/image.svg";
import Logout from "@/assets/logout-03.svg";
import Mail from "@/assets/mail-02.svg";
import Bell from "@/assets/notification-03.svg";
import Settings from "@/assets/setting-03.svg";
import { PageTitle } from "@/utils/constants";
import type { DrawerProps, MenuProps } from "antd";
import { Drawer, Dropdown, Tooltip, notification } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import NavMenuItems from "../navlinks";
import { bottomRoutes, routes } from "../sidebar/links";

const images = [Bell, Mail];
const Header = () => {
  const [click, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [placement, ,] = useState<DrawerProps["placement"]>("left");
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      duration: 3,
      message: "In App Notification",
      description: "No Notification Available",
    });
  };

  const onClose = () => {
    setOpen(false);
    setClicked(false);
  };

  const handleClick = () => {
    setClicked((click) => !click);
    setOpen(true);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p className="font-light">User Profile Information</p>,
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2 font-light">
          Logout <Image src={Logout} alt="logout" />
        </div>
      ),
    },
  ];

  const pathname = usePathname();
  const getTitle = pathname.split("/");
  let getTitleEnum = getTitle[getTitle.length - 1];

  return (
    <>
      <div className="pt-8 pb-12 flex items-center justify-between sticky top-0 left-0">
        <p className="font-medium text-lg md:hidden">
          {PageTitle[getTitleEnum as keyof typeof PageTitle]}
        </p>
        <div className="hidden md:flex">
          <h1>Welcome back, </h1>
          <span className="pl-1 font-medium flex gap-1 items-center">
            Samuel <IoStar className="text-yellow-500" />
          </span>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          <div className="flex gap-4 items-center">
            {contextHolder}

            <Tooltip
              title="Notification"
              color={`#380ABB`}
              className="text-black"
            >
              <Image
                src={Bell}
                alt="bell"
                className="cursor-pointer"
                onClick={openNotification}
              />
            </Tooltip>

            <Tooltip title="Messages" color={`#380ABB`} className="text-black">
              <Link href="/messages">
                <Image src={Mail} alt="mail" className="cursor-pointer" />
              </Link>
            </Tooltip>

            <Tooltip title="Settings" color={`#380ABB`} className="text-black">
              <Link href="/settings">
                <Image
                  src={Settings}
                  alt="settings"
                  className="cursor-pointer"
                />
              </Link>
            </Tooltip>
          </div>

          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className="!font-light"
          >
            <Tooltip title="Profile" color={`#380ABB`} className="text-black">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <Image src={Profile} alt="profile" />
                <Image src={Dropdowns} alt="dropdown" />
              </div>
            </Tooltip>
          </Dropdown>
        </div>

        <div onClick={handleClick} className="lg:hidden">
          {click ? (
            <IoMdClose className="text-xl text-primary-100" />
          ) : (
            <RxHamburgerMenu className="text-xl text-primary-100" />
          )}
        </div>
      </div>

      <Drawer
        title=""
        placement={placement}
        closable={true}
        onClose={onClose}
        open={open}
        key={placement}
        className="font-light bg-white sticky top-0 left-0 pb-4"
      >
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
      </Drawer>
    </>
  );
};

export default Header;
