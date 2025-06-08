"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api/handlers";
import PostCard from "../components/PostCard";

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

const Page = () => {
  const { data: session } = useSession();
  const params = useParams<{ postId: string }>();
  const postId = params.postId;

  const fetchPost = async (): Promise<PostDataType> => {
    const response = await get<PostDataType>(`/api/posts/${postId}`, {
      Authorization: `Bearer ${session?.accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to fetch post");
    }

    return response;
  };

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<PostDataType>({
    queryKey: ["post", postId],
    queryFn: fetchPost,
    enabled: !!postId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="py-10">
      <h1 className="mb-4 text-2xl font-bold">Post Details</h1>
      {post && <PostCard post={post} />}
    </div>
  );
};

export default Page;
