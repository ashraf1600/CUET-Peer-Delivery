"use client";

import React from "react";
import { get } from "@/lib/api/handlers";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import Link from "next/link";

interface UserId {
  _id: string;
  name: string;
  email: string;
}

interface PostDataType {
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
  const GetAllPost = async (): Promise<PostDataType[]> => {
    const response = await get<PostDataType[]>(`/api/posts`);

    if (!response) {
      throw new Error("Failed to fetch posts");
    }

    return response;
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<PostDataType[]>({
    queryKey: ["posts"],
    queryFn: GetAllPost,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log("all post", posts);
  return (
    <div className="py-10">
      <h1 className="mb-4 text-2xl font-bold">All Posts</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post) => (
          <Link key={post._id} href={`/post/${post._id}`} passHref>
            <div className="cursor-pointer">
              <PostCard post={post} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllPost;
