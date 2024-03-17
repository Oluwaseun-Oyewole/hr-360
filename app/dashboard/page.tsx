"use client";
import User from "@/assets/image.svg";
import Filter from "@/components/filter";
import Hr360Modal, { IHr360Modal } from "@/components/modal";
import HR360Table from "@/components/table";
import { BenefitPayrollCards } from "@/utils/constants";
import { TableProps } from "antd";
import Image from "next/image";
import { useRef } from "react";
import { renderEmployment, renderStatus } from "../style";
import PayrollCard from "./payroll/payroll-card";

type EmployeeType = { name: string; img: string };

interface DataType {
  key: string;
  date: string;
  status: string;
  invoice: string;
  employee: EmployeeType;
  checkIn: string;
  checkOut: string;
  overtime: string;
  employmentType: string;
  role: string;
}

export default function Home() {

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      render: (_, el) => (
        <div className="flex items-center gap-2">
          {<Image src={el.employee.img} alt="" />}
          {el.employee.name}
        </div>
      ),
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Employment Type",
      dataIndex: "employmentType",
      key: "employeeType",
      render: (el) => (
        <div
          className={`lg:w-1/2 py-1 capitalize text-center  border-[1px] rounded-md ${renderEmployment(
            el
          )}`}
        >
          {el}
        </div>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (el) => (
        <div
          className={`py-1 capitalize text-center  border-[1px] rounded-md ${renderStatus(
            el
          )}`}
        >
          {el}
        </div>
      ),
    },

    {
      title: "Check In",
      dataIndex: "checkIn",
      key: "checkIn",
    },

    {
      title: "check Out",
      dataIndex: "checkOut",
      key: "checkOut",
    },

    {
      title: "Over Time",
      dataIndex: "overtime",
      key: "overtime",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      employee: { name: "Samuel Oyewole", img: User },
      checkIn: "9:00",
      checkOut: "5:00",
      date: "13/01",
      status: "Present",
      invoice: "View",
      overtime: "0h",
      employmentType: "Full-Time",
      role: "HR Manager",
    },
    {
      key: "2",
      employee: { name: "Samuel Oyewole", img: User },
      date: "13/01",
      checkIn: "9:00",
      checkOut: "5:00",
      status: "Absent",
      invoice: "View",
      overtime: "0h",
      employmentType: "Part-Time",
      role: "Software Engineer",
    },
    {
      key: "3",
      employee: { name: "Samuel Oyewole", img: User },
      date: "13/01",
      status: "Late",
      invoice: "View",
      checkIn: "9:00",
      checkOut: "5:00",
      overtime: "2h",
      employmentType: "Full-Time",
      role: "Sales Manager",
    },

    {
      key: "4",
      employee: { name: "Samuel Oyewole", img: User },
      checkIn: "9:00",
      checkOut: "5:00",
      date: "13/01",
      status: "Present",
      invoice: "View",
      overtime: "0h",
      employmentType: "Full-Time",
      role: "HR Manager",
    },
    {
      key: "5",
      employee: { name: "Samuel Oyewole", img: User },
      date: "13/01",
      checkIn: "9:00",
      checkOut: "5:00",
      status: "Absent",
      invoice: "View",
      overtime: "0h",
      employmentType: "Part-Time",
      role: "Software Engineer",
    },
    {
      key: "6",
      employee: { name: "Samuel Oyewole", img: User },
      date: "13/01",
      status: "Late",
      invoice: "View",
      checkIn: "9:00",
      checkOut: "5:00",
      overtime: "2h",
      employmentType: "Full-Time",
      role: "Sales Manager",
    },

    {
      key: "7",
      employee: { name: "Samuel Oyewole", img: User },
      checkIn: "9:00",
      checkOut: "5:00",
      date: "13/01",
      status: "Present",
      invoice: "View",
      overtime: "0h",
      employmentType: "Full-Time",
      role: "HR Manager",
    },
    {
      key: "8",
      employee: { name: "Samuel Oyewole", img: User },
      date: "13/01",
      checkIn: "9:00",
      checkOut: "5:00",
      status: "Absent",
      invoice: "View",
      overtime: "0h",
      employmentType: "Part-Time",
      role: "Software Engineer",
    },
  ];

  const modalRef = useRef<IHr360Modal>(null);

  const handleViewListModal = () => {
    modalRef.current?.open({
      title: <p>View Breakdown</p>,
      content: <p>Get your view list breakdown...</p>,
    });
  };

  const handlePayListModal = () => {
    modalRef.current?.open({
      title: "Pay List",
      content: <p>Get Payroll list Analysis...</p>,
    });
  };

  const handleViewModal = () => {
    modalRef.current?.open({
      title: "View",
      content: <p>Get your view analysis....</p>,
    });
  };

  return (
    <main>
      <Hr360Modal ref={modalRef} />
      <PayrollCard
        cardArray={BenefitPayrollCards}
        handlePayoutModal={handleViewListModal}
        handleViewModal={handlePayListModal}
        handleScheduleModal={handleViewModal}
      />
      <Filter />
      <HR360Table
        columns={columns}
        dataSource={data}
        pagination={false}
        title="employee"
        total={50}
        itemCountFrom={1}
        itemCountTo={5}
      />
    </main>
  );
}
