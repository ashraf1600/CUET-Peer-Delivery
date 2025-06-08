"use client";

import { Check } from "lucide-react";
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

interface PostCardProps {
  post: Task;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const statusOrder = ["Open", "Requested", "Accepted", "Completed"];

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const getStatusIndex = (status: string) => {
    return statusOrder.indexOf(status);
  };

  const isStatusReached = (status: string) => {
    const currentStatusIndex = getStatusIndex(post.status);
    const statusIndex = getStatusIndex(status);
    return currentStatusIndex >= statusIndex;
  };

  const getStatusColor = (status: string) => {
    if (post.status === status) {
      return "bg-green-500"; // Current status
    }
    if (isStatusReached(status)) {
      return "bg-green-500"; // Completed status
    }
    return "bg-gray-300";
  };

  return (
    <div className="m-4 h-96 w-96 overflow-hidden rounded-xl bg-white shadow-md">
      <div className="flex h-full flex-col p-6">
        <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
          {post?.status}
        </div>
        <h1 className="mt-1 text-lg font-medium text-black">
          Title: {truncateText(post?.title, 30)}
        </h1>
        <p className="mt-2 flex text-gray-500">
          Description: {truncateText(post?.description, 100)}
        </p>
        <div className="mt-8">
          <p className="text-sm text-gray-600">
            Created by: {post?.userId?.name}
          </p>
          <p className="text-sm text-gray-600">
            Created at: {new Date(post?.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-6">
          <h2 className="text-sm font-bold text-gray-900">Status History:</h2>
          <div className="mt-2 flex justify-between">
            {statusOrder.map((status) => (
              <div key={status} className="flex flex-col items-center">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${getStatusColor(
                    status,
                  )}`}
                >
                  {isStatusReached(status) && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </div>
                <span className="mt-1 text-xs text-gray-600">{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
