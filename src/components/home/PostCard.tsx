"use client";

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

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="m-4 mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
      <div className="p-8">
        <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
          {post?.status}
        </div>
        <h1 className="mt-1 block text-lg leading-tight font-medium text-black">
          Title : {post?.title}
        </h1>
        <p className="mt-2 text-gray-500">{post?.description}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Created by: {post?.userId?.name} ({post?.userId?.email})
          </p>
          <p className="text-sm text-gray-600">
            Created at: {new Date(post?.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Updated at: {new Date(post?.updatedAt).toLocaleString()}
          </p>
        </div>
        {post.statusHistory.length > 0 && (
          <div className="mt-4">
            <h2 className="text-sm font-medium text-gray-900">
              Status History
            </h2>
            <ul className="mt-2 space-y-2">
              {post.statusHistory.map((history, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {history?.status} by {history?.changedBy?.name} at{" "}
                  {new Date(history?.changedAt).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
