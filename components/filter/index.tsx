"use client";
import {
  DashboardSlice as api,
  useGetFilterEmployeesQuery,
  useGetSearchEmployeesQuery,
} from "@/app/dashboard/store/query";
import { startFilter, stopFilter } from "@/app/dashboard/store/slice";
import CSVImage from "@/assets/csv.svg";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { PageTitle, filters } from "@/utils/constants";
import { DatePicker, DatePickerProps, Dropdown } from "antd";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineRefresh } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";
import Button from "../button";
import FormikController from "../form/form-controller";
import Hr360Modal, { IHr360Modal } from "../modal";

const Filter = ({
  currentPage,
  totalPages,
  handleRefresh,
}: {
  currentPage: number;
  totalPages: number;
  handleRefresh: () => void;
}) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const getTitle = pathname.split("/");
  let getTitleEnum = getTitle[getTitle.length - 1];
  const searchParams = useSearchParams();
  const [dropdownFilter, setDropdownFilter] = useState<string>(
    searchParams.get("role")! ?? ""
  );
  const { data, isFilter }: any = useAppSelector(
    (state) => state.rootReducer.dashboard
  );
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("searchQuery")?.toString() ?? ""
  );
  const [page, setPage] = useState(+searchParams.get("page")! ?? currentPage);
  const [role, setRole] = useState(searchParams.get("role")! ?? "");
  const {} = useGetSearchEmployeesQuery(
    {
      page: page <= 0 || page > totalPages ? 1 : page,
      searchQuery: searchQuery!,
    },
    { skip: searchQuery === "" || !isFilter }
  );
  const {} = useGetFilterEmployeesQuery(
    {
      page: page <= 0 || page > totalPages ? 1 : page,
      role: dropdownFilter,
      date,
    },
    { skip: role === "" || !date || !isFilter }
  );

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    dispatch(api.util.resetApiState());
    if (term) {
      dispatch(startFilter());
      setSearchQuery(term);
      setPage(currentPage);
      params.set("searchQuery", term);
      params.set("page", currentPage.toString());
      params.delete("date", date);
      params.delete("role", role);
    } else {
      params.delete("searchQuery");
      params.delete("date");
      dispatch(stopFilter());
      refresh();
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    const params = new URLSearchParams(searchParams);
    setDate(dateString as string);
    setPage(currentPage);
    dispatch(startFilter());
    dispatch(api.util.resetApiState());
    if (date === "" || !dateString) {
      refresh();
    } else {
      params.set("date", dateString as string);
      params.set("role", role);
      params.delete("searchQuery", searchQuery);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const dateFormat = "YYYY-MM-DD";
  const modalRef = useRef<IHr360Modal>(null);
  const dispatch = useAppDispatch();
  const refresh = () => {
    dispatch(api.util.resetApiState());
    dispatch(stopFilter());
    handleRefresh();
    replace(`${pathname}?page=${currentPage}`);
  };

  const handleDropdown = (key: string) => {
    setPage(currentPage);
    dispatch(startFilter());
    dispatch(api.util.resetApiState());
    setRole(key);
    const params = new URLSearchParams(searchParams);
    params.set("role", key);
    params.set("date", date);
    params.delete("searchQuery", searchQuery);
    replace(`${pathname}?${params.toString()}`);
    setDropdownFilter(key);
  };

  return (
    <>
      <div className="py-4 last:lg:py-6 flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between text-sm relative">
        <Hr360Modal ref={modalRef} />
        <div className="basis-full lg:basis-[40%] flex items-center gap-2">
          <div className="w-[70%]">
            <Formik
              initialValues={{
                searchTerm: searchQuery,
              }}
              onSubmit={(values, { resetForm }) => {
                const params = new URLSearchParams(searchParams);
                setSearchQuery(values.searchTerm);
                setPage(currentPage);
                params.set("searchQuery", searchQuery);
                params.set("page", currentPage.toString());
                params.delete("date", date);
                params.delete("role", role);
                replace(`${pathname}?${params.toString()}`);
                resetForm();
              }}
            >
              {(formik) => {
                return (
                  <Form>
                    <div>
                      <FormikController
                        control="input"
                        type="search"
                        label=""
                        name="searchTerm"
                        // value={formik.values.searchTerm}
                        defaultValue={formik.values.searchTerm}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          handleSearch(e.target.value);
                          formik.handleChange;
                        }}
                        onBlur={formik.handleBlur}
                        placeholder="Search by name, role, department..."
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
          <Button
            className="border-[1px] border-gray-300  cursor-pointer !flex rounded-lg !py-[16px] !w-[25%] !text-black items-center justify-center"
            onClick={refresh}
          >
            <p>Refresh</p>
            <MdOutlineRefresh />
          </Button>
        </div>

        <div className="basis-full lg:basis-[50%] flex items-center lg:justify-end gap-2 w-full">
          <Dropdown
            className={`py-4 block px-[16px] w-full lg:w-auto cursor-pointer rounded-lg !text-sm border-[1px] border-gray-300`}
            openClassName="rounded-b-none"
            menu={{
              items: filters.map((filter, index) => {
                return {
                  key: filter.label,
                  label: (
                    <div
                      className={`px-[18px] py-[14px] w-[250px] flex justify-between items-center 
           ${index === filters.length - 1 ? "" : "border-b-[1px]"}
         `}
                    >
                      <span className="!text-sm font-light">
                        {filter.label}
                      </span>
                    </div>
                  ),
                  className: "!p-0",
                  onClick: (ev) => {
                    handleDropdown(ev.key);
                  },
                };
              }),
              onSelect: (ev) => {
                setDropdownFilter(ev.selectedKeys[0]);
              },
            }}
            trigger={["click"]}
          >
            <button className="flex justify-between items-center text-[16px] gap-2">
              {dropdownFilter || <span className="">All Roles</span>}
              {<IoMdArrowDropdown className="" />}
            </button>
          </Dropdown>

          <div className="w-full lg:w-auto">
            <DatePicker
              defaultValue={dayjs()}
              format={dateFormat}
              className="!w-full !py-[16px] !border-gray-300"
              placement="bottomRight"
              onChange={onChange}
              onPickerValueChange={() => {}}
            />
          </div>

          <div className="hidden md:block w-full lg:w-auto">
            <Button className="flex gap-2 border-[1px] border-gray-300 !py-[16px] !text-xs md:!text-sm justify-center lg:justify-start">
              <CSVLink
                data={data.employees ?? []}
                className="text-black flex gap-2"
                filename={`${PageTitle[getTitleEnum]} csv-file`}
              >
                Export CSV <Image src={CSVImage} alt="" />
              </CSVLink>
            </Button>
          </div>
        </div>

        <div className="w-[150px] md:hidden">
          <Button className="flex gap-2 border-[1px] border-gray-300 !py-[16px] !text-xs md:!text-sm justify-center">
            <CSVLink
              data={[]}
              className="text-black flex gap-2"
              filename={`${PageTitle[getTitleEnum]} csv-file`}
            >
              Export CSV <Image src={CSVImage} alt="" />
            </CSVLink>
          </Button>
        </div>
      </div>
      <Link href="/dashboard/attendance" className="text-primary-100">
        Attendance Form
      </Link>
    </>
  );
};

export default Filter;
