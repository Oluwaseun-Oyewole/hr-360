import { Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd/es/table";
import React from "react";
import HR360Pagination from "../pagination";

export interface TableParams {
  pagination?: TablePaginationConfig;
}

interface ITableProps extends TableProps<any> {
  title: any | undefined;
  total: number;
  itemCountFrom: number;
  itemCountTo: number;
  isPaginate?: boolean;
  width?: number;
}

const HR360Table: React.FC<ITableProps> = ({
  columns,
  dataSource = [],
  pagination,
  onChange,
  total,
  itemCountFrom,
  itemCountTo,
  title,
  isPaginate = true,
  width,
  ...rest
}) => {
  return (
    <>
      <div className="py-3">
        <Table
          dataSource={dataSource}
          columns={columns}
          onChange={onChange}
          pagination={pagination}
          {...rest}
          className="cursor-pointer"
          scroll={{ x: width ?? 900 }}
        />
      </div>
      {isPaginate && (
        <HR360Pagination
          total={total}
          title={title}
          itemCountFrom={itemCountFrom}
          itemCountTo={itemCountTo}
        />
      )}
    </>
  );
};

export default HR360Table;
