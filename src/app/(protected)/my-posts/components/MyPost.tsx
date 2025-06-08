"use client";

import { Check } from "lucide-react";
import { del, get } from "@/lib/api/handlers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import TableComponent from "./TableComponent";
import toast from "react-hot-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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

const MyPost = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState<Task | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const getOwnPosts = async () => {
    const response = await get<Task[]>(`/api/posts/own/posts`, {
      Authorization: `Bearer ${session?.accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to fetch posts");
    }

    return response;
  };

  const getPostById = async (postId: string): Promise<Task> => {
    const response = await get<Task>(`/api/posts/${postId}`, {
      Authorization: `Bearer ${session?.accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to fetch post");
    }

    return response;
  };

  const deletePost = async (id: string) => {
    const response = await del(`/api/posts/${id}`, {
      Authorization: `Bearer ${session?.accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to delete post");
    }

    return response;
  };

  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["own-posts"] });
      toast.success("Post deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const {
    data: ownPost,
    isLoading,
    error,
  } = useQuery<Task[]>({
    queryKey: ["own-posts"],
    queryFn: getOwnPosts,
  });

  const { data: postDetails } = useQuery<Task>({
    queryKey: ["post", selectedPost?._id],
    queryFn: () => getPostById(selectedPost!._id),
    enabled: !!selectedPost?._id,
  });

  const statusOrder = ["Open", "Requested", "Accepted", "Completed"];

  const getStatusIndex = (status: string) => {
    return statusOrder.indexOf(status);
  };

  const isStatusReached = (status: string, currentStatus: string) => {
    const currentStatusIndex = getStatusIndex(currentStatus);
    const statusIndex = getStatusIndex(status);
    return currentStatusIndex >= statusIndex;
  };

  const getStatusColor = (status: string, currentStatus: string) => {
    if (currentStatus === status) {
      return "bg-green-500"; // Current status
    }
    if (isStatusReached(status, currentStatus)) {
      return "bg-green-500"; // Completed status
    }
    return "bg-gray-300";
  };

  const handleView = (task: Task) => {
    setSelectedPost(task);
    setIsSheetOpen(true);
  };

  const handleEdit = (task: Task) => {
    console.log("Edit task:", task);
    // Implement edit logic here
  };

  const handleDelete = (id: string) => {
    toast((t) => (
      <div>
        <p>Are you sure you want to delete this post?</p>
        <div className="mt-2 flex justify-end space-x-2">
          <button
            className="cursor-pointer rounded bg-gray-300 px-3 py-1"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="cursor-pointer rounded bg-red-500 px-3 py-1 text-white"
            onClick={() => {
              mutate(id);
              toast.dismiss(t.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="py-4">
      <h1 className="flex justify-center py-5 text-2xl font-bold">My Posts</h1>
      <TableComponent
        data={ownPost || []}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="p-5">
          <SheetHeader>
            <SheetTitle>Post Details</SheetTitle>
          </SheetHeader>
          {postDetails && (
            <div className="mt-4">
              <h2 className="text-lg font-bold">Title: {postDetails.title}</h2>
              <p className="mt-2">Description: {postDetails.description}</p>
              <p className="mt-2 text-sm text-gray-500">
                Created by: {postDetails?.userId.name}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Created at: {new Date(postDetails.createdAt).toLocaleString()}
              </p>
              <div className="mt-6">
                <h2 className="text-sm font-bold text-gray-900">
                  Status History:
                </h2>
                <div className="mt-2 flex justify-between">
                  {statusOrder.map((status) => (
                    <div key={status} className="flex flex-col items-center">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${getStatusColor(
                          status,
                          postDetails.status,
                        )}`}
                      >
                        {isStatusReached(status, postDetails.status) && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="mt-1 text-xs text-gray-600">
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MyPost;
