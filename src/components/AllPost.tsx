"use client";

import React from "react";
import { get } from "@/lib/api/handlers";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./home/PostCard";

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

const AllPost = () => {
  const GetAllPost = async (): Promise<Task[]> => {
    const response = await get<Task[]>(`/api/posts`);

    if (!response) {
      throw new Error("Failed to fetch posts");
    }

    return response;
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Task[]>({
    queryKey: ["posts"],
    queryFn: GetAllPost,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log("all post", posts);
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">All Posts</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default AllPost;
