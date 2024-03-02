"use client";
import CSVImage from "@/assets/csv.svg";
import { PageTitle } from "@/utils/constants";
import { DatePicker, Dropdown } from "antd";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import Button from "../button";
import FormikController from "../form/form-controller";
import Hr360Modal, { IHr360Modal } from "../modal";

const Filter = () => {
  const [dropdownFilter, setDropdownFilter] = useState<string | null>(null);

  const pathname = usePathname();
  const getTitle = pathname.split("/");
  let getTitleEnum = getTitle[getTitle.length - 1];

  const filters = [
    {
      label: "Human Resource",
    },
    {
      label: "Software Engineering",
    },
    {
      label: "Sales & Marketing",
    },

    {
      label: "Managing",
    },
  ];

  const dateFormat = "YYYY/MM/DD";

  const modalRef = useRef<IHr360Modal>(null);

  return (
    <div className="py-4 last:lg:py-6 flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between text-sm relative">
      <Hr360Modal ref={modalRef} />
      <div className="basis-full lg:basis-[40%] flex items-center gap-2">
        <div className="w-[70%]">
          <Formik
            initialValues={{
              searchTerm: "",
            }}
            onSubmit={(values) => {}}
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
                      value={formik.values.searchTerm}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Search by name, role, department..."
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <Button className="border-[1px] border-gray-300  cursor-pointer !flex rounded-lg !py-[16px] !w-[25%] !text-black items-center justify-center hover:cursor-not-allowed">
          <p>Filter </p>
          <IoFilter />
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
                    className={`px-[18px] py-[14px] flex justify-between items-center 
           ${index === filters.length - 1 ? "" : "border-b-[1px]"}
         `}
                  >
                    <span className="!text-sm font-light">{filter.label}</span>
                  </div>
                ),
                className: "!p-0",
                onClick: (ev) => {
                  setDropdownFilter(ev.key);
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
            {dropdownFilter || <span className="">All Departments</span>}
            {<IoMdArrowDropdown className="" />}
          </button>
        </Dropdown>

        <div className="w-full lg:w-auto">
          <DatePicker
            defaultValue={dayjs("2015/01/01", dateFormat)}
            format={dateFormat}
            className="!w-full !py-[16px] !border-gray-300"
            placement="bottomRight"
          />
        </div>

        <div className="hidden md:block w-full lg:w-auto">
          <Button className="flex gap-2 border-[1px] border-gray-300 !py-[16px] !text-xs md:!text-sm justify-center lg:justify-start">
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
  );
};

export default Filter;
