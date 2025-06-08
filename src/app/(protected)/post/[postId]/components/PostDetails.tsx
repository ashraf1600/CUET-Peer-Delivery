"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, put } from "@/lib/api/handlers";

import CommentSection from "./CommentSection";
import PostCard from "../../components/PostCard";
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

interface PostDetailsProps {
  postId: string;
  accessToken: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({ postId, accessToken }) => {
  const queryClient = useQueryClient();
  const [requestSent, setRequestSent] = useState(false);

  const fetchPost = async (): Promise<PostDataType> => {
    const response = await get<PostDataType>(`/api/posts/${postId}`, {
      Authorization: `Bearer ${accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to fetch post");
    }

    return response;
  };

  const updatePostStatus = async (newStatus: string): Promise<void> => {
    await put(
      `/api/posts/${postId}`,
      { status: newStatus },
      {
        Authorization: `Bearer ${accessToken}`,
      },
    );
  };

  const { mutate } = useMutation({
    mutationFn: updatePostStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      setRequestSent(true);
    },
  });

  const handleStatusUpdate = (newStatus: string) => {
    mutate(newStatus);
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
  if (!post) return <div>No post found</div>;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex w-full max-w-6xl">
        <div className="w-1/3 p-4">
          <img
            src="/fallBackImage.jpg"
            alt="Fallback"
            className="w-full rounded-lg"
          />
        </div>
        <div className="w-2/3 p-4">
          <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>
          <p className="mb-2 text-gray-700">{post.description}</p>
          <p className="mb-1 text-sm text-gray-500">
            Created by: <span className="font-medium">{post.userId.name}</span>
          </p>
          <p className="mb-1 text-sm text-gray-500">
            Created at:{" "}
            <span className="font-medium">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </p>
          <Button
            onClick={() => handleStatusUpdate("Accepted")}
            disabled={requestSent}
            className="mt-4 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            {requestSent ? "Request Sent" : "Send Request"}
          </Button>
        </div>
      </div>

      <div className="mt-4 w-full max-w-6xl">
        <CommentSection postId={postId} accessToken={accessToken} />
      </div>
    </div>
  );
};

export default PostDetails;
