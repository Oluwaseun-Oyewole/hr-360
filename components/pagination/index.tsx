"use client";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useState } from "react";
import { HiOutlineBackward } from "react-icons/hi2";
import { IoPlayForwardOutline } from "react-icons/io5";

type IPagination = {
  total: number;
  title: string;
  itemCountFrom: number;
  itemCountTo: number;
};
const HR360Pagination = ({
  total,
  title,
  itemCountFrom,
  itemCountTo,
}: IPagination) => {
  const [current, setCurrent] = useState(3);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };
  return (
    <div className="py-6 flex justify-between items-center">
      <div className="flex gap-3">
        <span className="text-gray-500">Showing</span>
        <span className="font-normal">
          {itemCountFrom} to {itemCountTo} of {total}
        </span>
        <span className="text-gray-500">{title}</span>
      </div>
      <Pagination
        current={current}
        onChange={onChange}
        total={total}
        pageSize={5}
        showQuickJumper={false}
        showPrevNextJumpers={true}
        className="flex items-center justify-center"
        prevIcon={
          <div className="bg-[#F5F5F5] p-2 rounded-lg">
            <HiOutlineBackward className="text-md" />
          </div>
        }
        nextIcon={
          <div className="bg-[#F5F5F5] p-2 rounded-lg">
            <IoPlayForwardOutline className="text-md" />
          </div>
        }
      />
    </div>
  );
};

export default HR360Pagination;
