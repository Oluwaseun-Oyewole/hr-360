"use client";
import BookMark from "@/assets/bookmark-02.svg";
import Calender from "@/assets/calendar-01.svg";
import Details from "@/assets/datails.svg";
import Emeka from "@/assets/emeka.svg";
import Grid from "@/assets/grid.svg";
import Dot from "@/assets/more-horizontal-circle-01.svg";
import Pin from "@/assets/pin.svg";
import Check from "@/assets/read.svg";
import Reply from "@/assets/reply.svg";
import { allMessages, messages, pinMessages } from "@/utils/constants";
import { Input } from "antd";
import Image from "next/image";

export default function Home() {
  return (
    <main className="py-6 grid grid-flow-row lg:grid-flow-col lg:grid-cols-[35%_auto] gap-7 overflow-y-hidden">
      <div className="w-full h-[650px] overflow-y-scroll sticky top-0 left-0">
        <div className="flex gap-2 items-center pb-8 text-gray-500">
          <Image src={Grid} alt="" /> Group Chats
        </div>
        <div>
          {messages?.map((message, index) => {
            return (
              <div key={index} className="flex gap-5 items-center pb-4">
                <Image src={message.imageSrc} alt="" />
                <div className="w-[65%] flex gap-1 flex-col self-start">
                  <p>{message.title}</p>
                  <p className="text-gray-500 text-sm">{message.description}</p>
                </div>
                <div className="flex gap-2 flex-col">
                  <p className="text-xs lg:text-sm">{message.time}</p>
                  <div className="self-end">
                    <Image src={message.readSrc} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 items-center pt-4 pb-6 text-gray-500">
          <Image src={Pin} alt="" className="h-6 w-6" />
          Pin messages
        </div>

        {pinMessages?.map((message, index) => {
          return (
            <div key={index} className="flex gap-5 items-center pb-4">
              <Image src={message.imageSrc} alt="" />
              <div className="w-[65%] flex gap-1 flex-col self-start">
                <p>{message.title}</p>
                <p className="text-gray-500 text-sm">{message.description}</p>
              </div>
              <div className="flex gap-2 flex-col">
                <p className="text-[9px] lg:text-sm">{message.time}</p>
                <div className="self-end">
                  <Image src={message.readSrc} alt="" />
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex gap-2 items-center pt-4 pb-6 text-gray-500">
          <Image src={Pin} alt="" />
          All messages
        </div>

        {allMessages?.map((message, index) => {
          return (
            <div key={index} className="flex gap-5 items-center pb-4">
              <Image src={message.imageSrc} alt="" />
              <div className="w-[65%] flex gap-1 flex-col self-start">
                <p>{message.title}</p>
                <p className="text-gray-500 text-sm">{message.description}</p>
              </div>
              <div className="flex gap-2 flex-col">
                <p className="text-[8px] lg:text-sm">{message.time}</p>
                <div className="self-end">
                  <Image src={message.readSrc} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-[650px] overflow-y-scroll sticky top-0 left-0 border-[1px] border-gray-200 rounded-lg py-8 px-4">
        <div className="flex justify-between pb-3 items-center border-b-[1px] border-gray-200">
          <div className="flex items-center gap-2 sticky left-0 top-0 overflow-y-scroll">
            <Image src={Emeka} alt="" />
            <div>
              <p>ChukwuEmeka</p>
              <p className="text-sm text-green-600">Available</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Image src={BookMark} alt="" /> <Image src={Calender} alt="" />
            <Image src={Pin} alt="" /> <Image src={Dot} alt="" />
          </div>
        </div>

        <div>
          <div className="py-5 text-sm">
            <p className="text-primary-100">ChukwuEmeka</p>
            <p className="py-3">Hi, how are you today?</p>
            <p>10:07 AM</p>
          </div>
          <div className="py-5 text-sm flex items-end justify-end flex-col">
            <p className="text-primary-100">Me</p>
            <p className="py-3">I need those reports by 3pm, please</p>
            <div className="flex gap-2">
              <p>10:07 AM </p>
              <Image src={Check} alt="" />
            </div>
          </div>

          <div className="py-5 text-sm">
            <p className="text-primary-100">ChukwuEmeka</p>
            <p className="py-3">Sure, you will get them on time.</p>
            <p>10:07 AM</p>
          </div>

          <div className="py-5 text-sm flex items-end justify-end flex-col">
            <p className="text-primary-100">Me</p>
            <p className="py-3">
              Also I hope you have the chance to review the project update
            </p>
            <div className="flex gap-2">
              <p>10:07 AM </p>
              <Image src={Check} alt="" />
            </div>
          </div>

          <div className="flex gap-3 justify-between items-center py-2 bg-gray-50 rounded-lg px-5 border-[1px] border-gray-200">
            <Image src={Reply} alt="" />
            <Input
              type="text"
              placeholder="Type your message here..."
              name="password"
              className="!py-3 !border-none !outline-none !bg-gray-50"
              autoComplete="off"
            />

            <div className="hidden md:flex">
              <Image src={Details} alt="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
