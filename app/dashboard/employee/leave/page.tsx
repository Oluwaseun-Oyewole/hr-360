"use client";
import User from "@/assets/image.svg";
import Button from "@/components/button";
import Cards from "@/components/card";
import Filter from "@/components/filter";
import Hr360Modal, { IHr360Modal } from "@/components/modal";
import HR360Table from "@/components/table";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { LeaveCards } from "@/utils/constants";
import { truncate } from "@/utils/helper";
import { Popover, TableProps, Tag } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { renderEmployment, renderStatus } from "../../../style";
import { useGetAllEmployeesQuery } from "../../store/query";
import { startFilter, stopFilter } from "../../store/slice";

type EmployeeType = { name: string; img: string };
type RowType = {
  [key: string]: any;
};

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
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    +searchParams.get("page")! ?? 1
  );
  const page = currentPage <= 0 ? 1 : currentPage;
  const role = useState(+searchParams.get("role")!);
  const modalRef = useRef<IHr360Modal>(null);
  const query = useState(+searchParams.get("searchQuery")!);
  const { data, isLoading, isFilter } = useAppSelector(
    (state: any) => state.rootReducer.dashboard
  );

  useEffect(() => {
    if (role || query) {
      dispatch(startFilter());
    } else {
      dispatch(stopFilter());
    }
  }, []);

  const seeMoreModal = () => {
    modalRef.current?.open({
      title: "See More",
      content: (
        <div>
          <p className="pb-2">All Users Details</p>
          <div className="grid grid-flow-col grid-cols-[max_content-auto-auto] items-center justify-between">
            <div className="flex flex-col gap-1">
              Email: <Tag>{rowInfo?.email}</Tag>
            </div>
            <div className="flex flex-col gap-1">
              FullName:<Tag>{rowInfo?.employeeName}</Tag>
            </div>
            <div className="flex flex-col gap-1">
              Role:<Tag>{rowInfo?.role}</Tag>
            </div>
          </div>
        </div>
      ),
    });
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (el) => {
        return <div>{dayjs(el, "YYYY-MM-DD+h:mm").format("YYYY-MM-DD")}</div>;
      },
    },

    {
      title: "Employee",
      dataIndex: "employeeName",
      key: "employeeName",
      render: (el) => (
        <div className="flex items-center gap-2">
          {<Image src={User} alt="" />}
          {el}
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (el) => {
        return (
          <Tag key={el}>
            <Popover content={el}>{truncate(el, 15)}</Popover>
          </Tag>
        );
      },
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (el) => {
        return (
          <Tag key={el}>
            <Popover content={el}>{truncate(el, 10)}</Popover>
          </Tag>
        );
      },
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
      render: (el) => <div>{`${el} AM`}</div>,
    },

    {
      title: "check Out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (el) => <div>{`${el} PM`}</div>,
    },

    {
      title: "Over Time",
      dataIndex: "overTime",
      key: "overTime",
      render: (el) => <div>{`${el} h`}</div>,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <div
            onClick={() => {
              setRowInfo(record);
            }}
          >
            <Button
              className="!text-primary-100 !border-[1px] !border-primary-100 !w-[80px] !py-2 !px-2 !text-xs"
              onClick={seeMoreModal}
            >
              See More
            </Button>
          </div>
        </>
      ),
    },
  ];

  const { refetch } = useGetAllEmployeesQuery(page, {
    skip: isFilter || page === 0,
  });
  const [rowInfo, setRowInfo] = useState<RowType>();

  const handleRefresh = () => {
    return !isFilter && refetch();
  };

  return (
    <main>
      <Hr360Modal ref={modalRef} />
      <Cards cardArray={LeaveCards} />
      <Filter
        currentPage={page}
        totalPages={data?.totalPages}
        handleRefresh={handleRefresh}
      />

      <HR360Table
        columns={columns}
        dataSource={data?.employees ?? []}
        loading={isLoading}
        pagination={false}
        title="employees"
        total={data?.totalResults ?? 0}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        resultsPerPage={data?.resultsPerPage ?? 10}
        totalResults={data?.totalResults ?? 0}
        page={data?.page ?? currentPage}
        width={1300}
      />
    </main>
  );
}
