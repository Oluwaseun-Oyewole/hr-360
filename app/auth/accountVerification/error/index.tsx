"use client";
import { useRouter } from "next/navigation";

const InvalidRoute = () => {
  const router = useRouter();
  return (
    <div className="grid grid-flow-row lg:grid-flow-col lg:grid-cols-[30%_auto] h-screen w-full">
      <div className="bg-base text-black w-full px-10 pt-10"></div>

      <div className="div flex flex-col items-center justify-center h-screen">
        <p>Invalid Step Params</p>
        <p
          onClick={() => router.back()}
          className="!cursor-pointer hover:text-primary"
        >
          Go back
        </p>
      </div>
    </div>
  );
};

export default InvalidRoute;
