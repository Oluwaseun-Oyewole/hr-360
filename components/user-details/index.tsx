"use client";
import Dropdowns from "@/assets/arrow-down-01-round.svg";
import Profile from "@/assets/image.svg";
import Logout from "@/assets/logout-03.svg";
import Mail from "@/assets/mail-02.svg";
import Bell from "@/assets/notification-03.svg";
import { routes } from "@/routes";
import type { MenuProps } from "antd";
import { Dropdown, Tooltip, notification } from "antd";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type UserProps = {
  isHidden: boolean;
  role: string;
};
const UserDetails = ({ isHidden, role }: UserProps) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification: any = () => {
    {
      api.open({
        duration: 3,
        message: "",
        description: <div>No Notification</div>,
      });
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href={routes.accountUpdate}>
          <p className="font-light">Account update</p>
        </Link>
      ),
    },

    {
      key: "2",
      label: (
        <div
          className="flex items-center gap-2 font-light"
          onClick={() => {
            signOut({ callbackUrl: routes.login });
          }}
        >
          Logout <Image src={Logout} alt="logout" />
        </div>
      ),
    },
  ];

  return (
    <div className={`${isHidden && "hidden"} flex gap-8 items-center`}>
      <div className="flex gap-4 items-center">
        {contextHolder}

        <div className="relative">
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
        </div>

        <Tooltip title="Messages" color={`#380ABB`} className="text-black">
          <Link href="/dashboard/messages">
            <Image src={Mail} alt="mail" className="cursor-pointer" />
          </Link>
        </Tooltip>
      </div>

      <Dropdown menu={{ items }} trigger={["click"]} className="!font-normal">
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
