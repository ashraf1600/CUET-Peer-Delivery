import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { Eye, Edit3, Trash2, CreditCard, Calendar, User, FileText, DollarSign } from "lucide-react";
import PaymentDialog from "./PaymentDialog";
import { Button } from "@/components/ui/button";

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
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");

  const handlePaymentClick = (postId: string) => {
    setSelectedPostId(postId);
    setIsPaymentDialogOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'requested':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatId = (id: string) => {
    return `#${id.slice(-6).toUpperCase()}`;
  };

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "_id",
      header: () => (
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          <FileText className="h-4 w-4" />
          <span>ID</span>
        </div>
      ),
      cell: ({ getValue }) => (
        <div className="font-mono text-sm text-gray-900 font-medium">
          {formatId(getValue() as string)}
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: () => (
        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Title
        </div>
      ),
      cell: ({ getValue }) => (
        <div className="max-w-xs">
          <div className="text-sm font-semibold text-gray-900 mb-1">
            {truncateText(getValue() as string, 30)}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Status
        </div>
      ),
      cell: ({ getValue }) => (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeVariant(getValue() as string)}`}>
          {getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "userId.name",
      header: () => (
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          <User className="h-4 w-4" />
          <span>Posted By</span>
        </div>
      ),
      cell: ({ getValue }) => (
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-sm font-medium text-gray-900">
          </div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          <Calendar className="h-4 w-4" />
          <span>Created</span>
        </div>
      ),
      cell: ({ getValue }) => (
        <div className="text-sm text-gray-600">
          {new Date(getValue() as string).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      ),
    },
    {
      id: "payment",
      header: () => (
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          <DollarSign className="h-4 w-4" />
          <span>Payment</span>
        </div>
      ),
      cell: ({ row }) => (
        <Button
          onClick={() => handlePaymentClick(row.original._id)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 text-sm px-4 py-2 rounded-lg font-medium"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Pay Now
        </Button>
      ),
    },
    {
      id: "actions",
      header: () => (
        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
          Actions
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center space-x-1">
          <button
            onClick={() => onView(row.original)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150 group"
            title="View details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(row.original)}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-150 group"
            title="Edit post"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(row.original._id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-150 group"
            title="Delete post"
          >
            <Trash2 className="h-4 w-4" />
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

  // Empty state component
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <div className="bg-gray-100 rounded-full p-6 mb-4">
          <FileText className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900">No posts found</h3>
        <p className="text-sm text-center max-w-sm">
          You have not created any posts yet. Create your first post to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="overflow-hidden shadow-sm border border-gray-200 rounded-xl">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left"
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
            <tbody className="bg-white divide-y divide-gray-100">
              {table.getRowModel().rows.map((row, index) => (
                <tr 
                  key={row.id} 
                  className={`hover:bg-gray-50/50 transition-colors duration-150 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {data.map((task) => (
          <div key={task._id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-150">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-mono text-sm text-gray-500 font-medium">
                    {formatId(task._id)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeVariant(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {task.title}
                </h3>
              </div>
            </div>
            
            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{task.userId.name || "Unknown"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onView(task)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150"
                  title="View details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-150"
                  title="Edit post"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-150"
                  title="Delete post"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <Button
                onClick={() => handlePaymentClick(task._id)}
                className="bg-gradient-to-r from-blue-700 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 text-sm px-4 py-2 rounded-lg font-medium"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Dialog */}
      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        postId={selectedPostId}
      />
    </div>
  );
};

export default TableComponent;