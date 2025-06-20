import React, { useState } from "react";
import { CreditCard, Calendar, User, FileText } from "lucide-react";
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

const ListComponent: React.FC<TableComponentProps> = ({
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
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'requested': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

  const formatId = (id: string) => `#${id.slice(-6).toUpperCase()}`;

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
    <div className="space-y-4">
      {data.map((task) => (
        <div
          key={task._id}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-150"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex flex-col">
              <span className="font-mono text-sm text-gray-500">
                {formatId(task._id)}
              </span>
              <span className={`inline-flex items-center px-2 py-1 mt-1 rounded-full text-xs font-medium border ${getStatusBadgeVariant(task.status)}`}>
                {task.status}
              </span>
              <h3 className="text-base font-semibold text-gray-900 mt-2">
                {truncateText(task.title, 50)}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {truncateText(task.description, 80)}
              </p>
            </div>
            <div className="flex flex-col items-end text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4 text-gray-400" />
                <span>{task.userId.name || "Unknown"}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>{new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-between items-center border-t pt-4">
            <div className="flex space-x-2">
              <Button
                onClick={() => onView(task)}
                className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm font-medium rounded-md px-3 py-1"
              >
                View Post
              </Button>
              <Button
                onClick={() => onEdit(task)}
                className="bg-green-100 text-green-800 hover:bg-green-200 text-sm font-medium rounded-md px-3 py-1"
              >
                Update Post
              </Button>
              <Button
                onClick={() => onDelete(task._id)}
                className="bg-red-100 text-red-800 hover:bg-red-200 text-sm font-medium rounded-md px-3 py-1"
              >
                Delete Post
              </Button>
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

      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        postId={selectedPostId}
      />
    </div>
  );
};

export default ListComponent;