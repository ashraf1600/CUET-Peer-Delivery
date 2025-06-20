"use client";

import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";

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

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

const statusOrder = ["Open", "Requested", "Accepted", "Completed"];

const getInitials = (name: string) => {
  const names = name.split(" ");
  const first = names[0]?.charAt(0).toUpperCase() || "";
  const second = names[1]?.charAt(0).toUpperCase() || "";
  return first + second;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const getStatusIndex = (status: string) => statusOrder.indexOf(status);

  const isStatusReached = (status: string) =>
    getStatusIndex(post.status) >= getStatusIndex(status);

  const getStatusColor = (status: string) => {
    if (post.status === status) return "bg-blue-700";
    return isStatusReached(status) ? "bg-blue-400" : "bg-gray-300";
  };

  return (
    <div className="m-4 w-full max-w-xl rounded-xl bg-white border border-gray-200 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm uppercase">
            {getInitials(post.userId.name)}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-800">
              {post.userId.name}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold uppercase">
          {post.status}
        </div>
      </div>

      {/* Post Content Box */}
      <div className="mt-4 rounded-md bg-gray-50 p-4">
        <h2 className="text-base font-bold text-gray-800 mb-1">
          {truncateText(post.title, 60)}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {truncateText(post.description, 180)}
        </p>
      </div>

      {/* Status Progress */}
      <div className="mt-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Delivery Progress
        </h3>
        <div className="flex justify-between">
          {statusOrder.map((status) => (
            <div key={status} className="flex flex-col items-center gap-1">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full ${getStatusColor(
                  status
                )}`}
              >
                {isStatusReached(status) && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </div>
              <span className="text-xs text-gray-500">{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* See Details */}
      <div className="mt-4 flex justify-end">
        <Link
          href={`/post/${post._id}`}
          className="text-blue-700 text-sm font-medium hover:underline"
        >
          See Details →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
