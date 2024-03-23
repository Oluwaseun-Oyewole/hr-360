"use client";
import { truncate } from "@/utils/helper";
import { Tooltip } from "antd";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdArrowDropUp } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import Dropdown from "../dropdown";
import { IRoutesType } from "../sidebar/links";

type INavMenuTypes = {
  route: IRoutesType;
};
const NavMenuItems: React.FC<INavMenuTypes> = ({ route }) => {
  const { path, icon, title, subRoutes, ActiveIcon, disabled } = route;
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLLIElement | null>(null);
  const handleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && e.target instanceof Node) {
        if (!menuRef.current.contains(e.target)) {
          setDropdown(false);
        }
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {subRoutes ? (
        <li className={`w-full`} onClick={handleDropdown} ref={menuRef}>
          <div
            className={classNames(
              "flex px-3 justify-between items-center w-full",
              {
                "bg-primary-100 py-5 rounded-lg": subRoutes?.some(
                  (route) => pathname === route.url
                ),
              }
            )}
          >
            <div className={`flex gap-3 tex-white cursor-pointer`}>
              {subRoutes?.some((route) => pathname === route.url) ? (
                <ActiveIcon className="text-xl text-white" />
              ) : (
                <Image src={icon} alt="icon" />
              )}

              <Tooltip title={title} color={`#380ABB`} className="text-black">
                <p
                  className={classNames(`text-sm hover:text-primary-100`, {
                    "text-white hover:text-white": subRoutes?.some(
                      (route) => pathname === route.url
                    ),
                  })}
                >
                  {truncate(title, 15)}
                </p>
              </Tooltip>
            </div>

            <div>
              {dropdown ? (
                <MdArrowDropUp
                  className={`text-xl cursor-pointer ${"text-white"}`}
                />
              ) : (
                <RiArrowDropDownLine
                  className={classNames("text-xl cursor-pointer", {
                    "text-white": subRoutes?.some(
                      (route) => pathname === route.url
                    ),
                  })}
                />
              )}
            </div>
          </div>

          <Dropdown subRoutes={subRoutes} dropdown={dropdown} />
        </li>
      ) : (
        <li
          className={`px-3 flex justify-between items-center ${
            pathname === path && "bg-primary-100 py-5 rounded-lg"
          }`}
        >
          <Link
            href={`${path}`}
            className={`flex gap-3 disabled:cursor-not-allowed`}
            aria-disabled={true}
            style={{
              pointerEvents: disabled ? "none" : "auto",
            }}
          >
            {pathname === path ? (
              <ActiveIcon className="text-xl text-white" />
            ) : (
              <Image src={icon} alt="icon" />
            )}

            <Tooltip
              title={title}
              color={`#380ABB`}
              className={`${pathname === path && "text-white"}`}
            >
              <p
                className={`text-sm text-black ${
                  pathname === path
                    ? "hover:text-white"
                    : "hover:text-primary-100"
                }`}
              >
                {truncate(title, 15)}
              </p>
            </Tooltip>
          </Link>
        </li>
      )}
    </>
  );
};

export default NavMenuItems;
