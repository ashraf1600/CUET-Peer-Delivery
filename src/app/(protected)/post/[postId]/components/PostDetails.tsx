"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, put } from "@/lib/api/handlers";

import CommentSection from "./CommentSection";
import Messenger from "./Messenger";
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
      }
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

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center py-10">Error: {error.message}</div>;
  if (!post) return <div className="text-center py-10">No post found</div>;

  const isPostOpen = post.status === "Open";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Post Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <span>Posted by {post.userId.name}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
            <span className="mx-2">•</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              post.status === "Open" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
            }`}>
              {post.status}
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Post Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <img
                    src="/fallBackImage.jpg"
                    alt="Fallback"
                    className="w-full h-64 sm:h-80 object-cover rounded-lg"
                  />
                </div>

                {/* Description */}
                <div className="w-full md:w-1/2">
                  <p className="text-black-700 whitespace-pre-line">{post.description}</p>
                  
                  {isPostOpen && (
                    <div className="mt-6">
                      <Button
                        onClick={() => handleStatusUpdate("Accepted")}
                        disabled={requestSent}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                      >
                        {requestSent ? "Request Accepted" : "Accept Request"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments</h2> */}
              <CommentSection postId={postId} />
            </div>
          </div>

          {/* Messenger Sidebar */}
          <div className="lg:w-80 xl:w-96">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Messenger</h2> */}
              <Messenger />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;