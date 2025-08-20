"use client";
import { routes } from "@/routes";
import { usePathname, useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

export default function GoBack() {
  const { back } = useRouter();
  const pathname = usePathname();
  const excludeRoutes = [routes.register, routes.login];
  return (
    <>
      {excludeRoutes?.includes(pathname) ? null : (
        <div
          className="flex items-center absolute top-10 left-10 md:left-32 text-primary-100"
          role="button"
          tabIndex={0}
          onClick={back}
        >
          <IoChevronBack /> <p className="text-sm">Back</p>
        </div>
      )}
    </>
  );
}
