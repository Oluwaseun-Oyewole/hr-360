import { Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd/es/table";
import React, { Dispatch, SetStateAction } from "react";
import HR360Pagination from "../pagination";

export interface TableParams {
  pagination?: TablePaginationConfig;
}

interface ITableProps extends TableProps<any> {
  title: any | undefined;
  total: number;
  currentPage: number;
  totalResults: number;
  page: number;
  resultsPerPage: number;
  isPaginate?: boolean;
  width?: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const HR360Table: React.FC<ITableProps> = ({
  columns,
  dataSource = [],
  pagination,
  onChange,
  totalResults,
  page,
  resultsPerPage,
  currentPage,
  total,
  setCurrentPage,
  title,
  isPaginate = true,
  width,
  ...rest
}) => {
  let locale = {
    emptyText: (
      <span>
        <p className="text-lg py-5 text-black">No data available</p>
      </span>
    ),
  };

  return (
    <>
      <div className="py-3">
        <Table
          locale={locale}
          dataSource={dataSource}
          columns={columns}
          onChange={onChange}
          pagination={pagination}
          className="cursor-pointer"
          scroll={{ x: width ?? 900 }}
          {...rest}
        />
      </div>
      {isPaginate && dataSource?.length > 0 && (
        <HR360Pagination
          total={total}
          title={title}
          totalResults={totalResults}
          page={page}
          currentPage={currentPage}
          resultsPerPage={resultsPerPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default HR360Table;
