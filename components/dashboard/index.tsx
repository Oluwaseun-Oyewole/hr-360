"use client";
import PayrollCard from "@/app/dashboard/payroll/payroll-card";
import { renderEmployment, renderStatus } from "@/app/style";
import Button from "@/components/button";
import Filter from "@/components/filter";
import Hr360Modal, { IHr360Modal } from "@/components/modal";
import HR360Table from "@/components/table";
import { useGetEmployees } from "@/services/queries";
import { IPayrollCardTypes } from "@/utils/constants";
import { truncate } from "@/utils/helper";
import { Popover, TableProps, Tag } from "antd";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

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

export default function DashboardComponent({
  cardArray,
}: {
  cardArray: IPayrollCardTypes[];
}) {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(+searchParams.get("page")!);
  const page = currentPage <= 0 ? 1 : currentPage;
  const role = searchParams.get("role")!;
  const query = searchParams.get("searchQuery")!;
  const params = {
    page: currentPage <= 0 ? 1 : currentPage,
    resultsPerPage: 10,
    role,
    query,
  };
  const { employees, employeesIsLoading, refetch } = useGetEmployees({
    ...params,
  });

  const [rowInfo, setRowInfo] = useState<RowType>();
  const columns: TableProps<DataType>["columns"] = [
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
      title: "Emp type",
      dataIndex: "employmentType",
      key: "employeeType",
      render: (el) => (
        <div
          className={`lg:w-1/2 capitalize text-center  border-[1px] rounded-md ${renderEmployment(
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
          className={`capitalize text-center  border-[1px] rounded-md ${renderStatus(
            el
          )}`}
        >
          {el}
        </div>
      ),
    },

    {
      title: "Check-in",
      dataIndex: "checkIn",
      key: "checkIn",
      render: (el) => {
        return <div>{dayjs(el).format("YYYY-MM-DD h:mm")}</div>;
      },
    },

    {
      title: "check-out",
      dataIndex: "checkOut",
      key: "checkOut",
      render: (el) => <div>{dayjs(el).format("YYYY-MM-DD h:mm")}</div>,
    },

    {
      title: "Overtime",
      dataIndex: "overTime",
      key: "overTime",
      render: (el) => {
        return el ? <div>{`${el} h`}</div> : "-";
      },
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
              className="!text-primary-100 !text-sm"
              onClick={seeMoreModal}
            >
              See More
            </Button>
          </div>
        </>
      ),
    },
  ];

  const handleRefresh = () => {
    refetch();
  };
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

  return (
    <main>
      <Hr360Modal ref={modalRef} />
      <PayrollCard
        cardArray={cardArray}
        handlePayoutModal={handleViewListModal}
        handleViewModal={handlePayListModal}
        handleScheduleModal={handleViewModal}
      />
      <Filter
        currentPage={page}
        totalPages={employees?.data?.totalPages}
        handleRefresh={handleRefresh}
      />

      <HR360Table
        columns={columns}
        dataSource={employees?.data?.employees ?? []}
        loading={employeesIsLoading}
        pagination={false}
        title="employees"
        total={employees?.data?.totalResults ?? 0}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        resultsPerPage={employees?.data?.resultsPerPage ?? 10}
        totalResults={employees?.data?.totalResults ?? 0}
        page={employees?.data?.page ?? currentPage}
        width={1300}
      />
    </main>
  );
}
