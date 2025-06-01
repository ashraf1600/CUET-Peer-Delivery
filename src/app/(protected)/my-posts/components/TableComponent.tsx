import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface UserId {
  _id: string;
  name: string;
  email: string;
}

interface Task {
  _id: string;
  userId: UserId;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  statusHistory: any[];
}

interface TableComponentProps {
  data: Task[];
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  onView,
  onEdit,
  onDelete,
}) => {
  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "userId.name",
      header: "Post By",
      cell: (info) => info.getValue() || "Unknown",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (info) => new Date(info.getValue() as string).toLocaleString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onView(row.original)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEye />
          </button>
          <button
            onClick={() => onEdit(row.original)}
            className="text-green-500 hover:text-green-700"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(row.original._id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border p-2 text-left font-semibold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
