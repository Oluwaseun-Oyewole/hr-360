"use client";
import Dropdowns from "@/assets/arrow-down-01-round.svg";
import Profile from "@/assets/image.svg";
import Logout from "@/assets/logout-03.svg";
import Mail from "@/assets/mail-02.svg";
import Bell from "@/assets/notification-03.svg";
import Settings from "@/assets/setting-03.svg";
import Hr360Modal, { IHr360Modal } from "@/components/modal";
import type { MenuProps } from "antd";
import { Dropdown, Tooltip, notification } from "antd";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Button from "../button";

type UserProps = {
  isHidden: boolean;
  role: string;
};
const UserDetails = ({ isHidden, role }: UserProps) => {
  const [msg, setMsgs] = useState([
    {
      id: 1,
      title: `Account Update (oauth user)`,
      description: "Click this link to update your account",
    },
  ]);

  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const openNotification: any = () => {
    {
      role === ""
        ? msg.map((value) => {
            api.open({
              duration: 3,
              message: value.title,
              description: (
                <div className="text-primary-100">
                  <Link href="/auth/accountUpdate">{value.description}</Link>
                </div>
              ),
            });
          })
        : api.open({
            duration: 3,
            message: "",
            description: <div>No Notification</div>,
          });
    }
  };

  const modalRef = useRef<IHr360Modal>(null);

  const handleLogoutModal = () => {
    modalRef.current?.open({
      title: "",
      content: (
        <div className="w-full flex items-center justify-center flex-col">
          <p className="text-lg pb-3 !font-light">
            Are you sure you want to logout?
          </p>

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
      ),
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href="/auth/accountUpdate">
          <p className="font-light">Account update</p>
        </Link>
      ),
    },

    {
      key: "2",
      label: (
        <Link href="/auth/forgotPassword">
          <p className="font-light">Update password</p>
        </Link>
      ),
    },

    {
      key: "3",
      label: (
        <Link href="/auth/emailUpdate">
          <p className="font-light">Update Email</p>
        </Link>
      ),
    },

    {
      key: "4",
      label: (
        <div
          className="flex items-center gap-2 font-light"
          onClick={handleLogoutModal}
        >
          Logout <Image src={Logout} alt="logout" />
        </div>
      ),
    },
  ];

  return (
    <div className={`${isHidden && "hidden"} flex gap-8 items-center`}>
      <Hr360Modal ref={modalRef} />
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

            {!role && (
              <div className="h-4 w-4 bg-red-500 rounded-full text-[8px] flex items-center justify-center text-white font-bold absolute -top-2 left-3">
                {msg?.length}
              </div>
            )}
          </Tooltip>
        </div>

        <Tooltip title="Messages" color={`#380ABB`} className="text-black">
          <Link href="/dashboard/messages">
            <Image src={Mail} alt="mail" className="cursor-pointer" />
          </Link>
        </Tooltip>

        <Tooltip title="Settings" color={`#380ABB`} className="text-black">
          <Link href="/dashboard/settings">
            <Image src={Settings} alt="settings" className="cursor-pointer" />
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
