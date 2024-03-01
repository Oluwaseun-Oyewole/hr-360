import { Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd/es/table";
import React from "react";
import HR360Pagination from "../pagination";

export interface TableParams {
  pagination?: TablePaginationConfig;
}

interface ITableProps extends TableProps<any> {
  title: any;
  total: number;
  itemCountFrom: number;
  itemCountTo: number;
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
  ...rest
}) => {
  return (
    <>
      <div className="py-3 h-[300px] overflow-y-scroll">
        <Table
          dataSource={dataSource}
          columns={columns}
          onChange={onChange}
          pagination={pagination}
          {...rest}
          className="relative cursor-pointer"
          scroll={{ x: 900 }}
        />
      </div>
      <HR360Pagination
        total={total}
        title={title}
        itemCountFrom={itemCountFrom}
        itemCountTo={itemCountTo}
      />
    </>
  );
};

export default HR360Table;
