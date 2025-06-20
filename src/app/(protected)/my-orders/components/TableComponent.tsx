import React from "react";

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
}

const TableComponent: React.FC<TableComponentProps> = ({ data, onView }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data.map((task) => (
        <div
          key={task._id}
          className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200 transition hover:shadow-xl"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          </div>

          <div className="text-sm text-gray-600 space-y-1 mb-4">
            <p><span className="font-medium">Status:</span> {task.status}</p>
            <p><span className="font-medium">Posted By:</span> {task.userId?.name || "Unknown"}</p>
            <p>
              <span className="font-medium">Created:</span>{" "}
              {new Date(task.createdAt).toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => onView(task)}
            className="text-sm text-blue-600 font-medium hover:underline hover:text-blue-800 transition"
          >
            See More
          </button>
        </div>
      ))}
    </div>
  );
};

export default TableComponent;
