"use client";
import Dropdowns from "@/assets/arrow-down-01-round.svg";
import Profile from "@/assets/image.svg";
import Logout from "@/assets/logout-03.svg";
import Mail from "@/assets/mail-02.svg";
import Bell from "@/assets/notification-03.svg";
import Settings from "@/assets/setting-03.svg";
import type { MenuProps } from "antd";
import { Dropdown, Tooltip, notification } from "antd";
import Image from "next/image";
import Link from "next/link";

const UserDetails = ({ isHidden }: { isHidden: boolean }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      duration: 3,
      message: "In App Notification",
      description: "No Notification Available",
    });
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
  return (
    <div className={`${isHidden && "hidden"} flex gap-8 items-center`}>
      <div className="flex gap-4 items-center">
        {contextHolder}

        <Tooltip title="Notification" color={`#380ABB`} className="text-black">
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
            <Image src={Settings} alt="settings" className="cursor-pointer" />
          </Link>
        </Tooltip>
      </div>

      <Dropdown menu={{ items }} trigger={["click"]} className="!font-light">
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
  );
};

export default UserDetails;
