"use client";

import React from "react";
import { get } from "@/lib/api/handlers";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

  if (isLoading) return <div className="text-center py-10">Loading posts...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;

  // Sort posts by creation date in descending order
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Your Own Post Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold mb-2">Create Your Own Post</h2>
            <p className="mb-4">
              Share your needs...
            </p>
            <Link href="/create-post">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-2 px-4 rounded">
                Create Post
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Community Feed</h1>
        </div>

        <div className="space-y-6">
          {sortedPosts?.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow duration-300">
              <Link href={`/post/${post._id}`} passHref>
                <PostCard post={post} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPost;
