import User from "@/assets/image.svg";
import HR360Table from "@/components/table";
import { formatCurrency } from "@/utils/helper";
import { TableProps } from "antd";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { renderEmployment } from "../../style";

type EmployeeType = { name: string; img: string };

interface DataType {
  key: string;
  date: string;
  employmentType: string;
  role: string;
  employee: EmployeeType;
  amount: number;
}

const PayrollBreakdown = () => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    +searchParams.get("page")! ?? 1
  );
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
      title: "Amount Paid ",
      dataIndex: "amount",
      key: "amount",
      render: (el) => {
        return <p> {`${formatCurrency(el, `\u20A6`)}`}</p>;
      },
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
  ];

  const data: DataType[] = [
    {
      key: "1",
      employee: { name: "Micheal Gabs", img: User },
      date: "13/01",
      employmentType: "Full-Time",
      role: "HR Manager",
      amount: 250000,
    },
    {
      key: "2",
      employee: { name: "Dolapo Popola", img: User },
      date: "13/01",
      employmentType: "Part-Time",
      role: "Software Engineer",
      amount: 150000,
    },
    {
      key: "3",
      employee: { name: "Yussuf Momoh", img: User },
      date: "13/01",
      amount: 350000,
      employmentType: "Full-Time",
      role: "Sales Manager",
    },

    {
      key: "4",
      employee: { name: "Mike Jean", img: User },
      date: "13/01",
      amount: 450000,
      employmentType: "Full-Time",
      role: "HR Manager",
    },
    {
      key: "5",
      employee: { name: "Jude Daniels", img: User },
      date: "13/01",
      amount: 150000,
      employmentType: "Part-Time",
      role: "Software Engineer",
    },
    {
      key: "6",
      employee: { name: "Samuel Oyewole", img: User },
      date: "13/01",
      amount: 550000,
      employmentType: "Full-Time",
      role: "Sales Manager",
    },
  ];

  return (
    <div className="font-light">
      <HR360Table
        title=""
        dataSource={data}
        columns={columns}
        pagination={false}
        isPaginate={false}
        total={0}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        resultsPerPage={10}
        totalResults={0}
        page={currentPage}
        width={800}
      />
    </div>
  );
};

export default PayrollBreakdown;
