"use client";

import { Check } from "lucide-react";
import { del, get, put } from "@/lib/api/handlers";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [ownPosts, setOwnPosts] = useState<Task[]>([]);

  const getOwnPosts = async () => {
    const response = await get<Task[]>(`/api/posts/own/posts`, {
      Authorization: `Bearer ${session?.accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to fetch posts");
    }

    return response;
  };

  const updatePost = async (postId: string, updatedData: Partial<Task>) => {
    const response = await put(`/api/posts/${postId}`, updatedData, {
      Authorization: `Bearer ${session?.accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to update post");
    }

    return response;
  };

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: ({ postId, updatedData }: { postId: string; updatedData: Partial<Task> }) =>
      updatePost(postId, updatedData),
    onMutate: async (newPostData) => {
      await queryClient.cancelQueries({ queryKey: ["own-posts"] });
      const previousPosts = queryClient.getQueryData<Task[]>(["own-posts"]);
      queryClient.setQueryData<Task[]>(["own-posts"], (oldPosts = []) =>
        oldPosts.map((post) =>
          post._id === newPostData.postId ? { ...post, ...newPostData.updatedData } : post
        )
      );
      return { previousPosts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", selectedPost?._id] });
      toast.success("Post updated successfully!");
      setIsEditDialogOpen(false);
    },
    onError: (error, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["own-posts"], context.previousPosts);
      }
      toast.error(`Error: ${error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["own-posts"] });
    },
  });

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

  const { data: ownPost, isLoading, error } = useQuery<Task[]>({
    queryKey: ["own-posts"],
    queryFn: getOwnPosts,
  });

  React.useEffect(() => {
    if (ownPost) {
      setOwnPosts(ownPost);
    }
  }, [ownPost]);

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
      return "bg-blue-500"; // Current status
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
    setSelectedPost(task);
    setEditFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPost) {
      mutateUpdate({ postId: selectedPost._id, updatedData: editFormData });
    }
  };

  const handleDelete = (id: string) => {
    toast((t) => (
      <div className="bg-white p-4 rounded shadow-lg">
        <p>Are you sure you want to delete this post?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">My Posts</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <TableComponent
          data={ownPost || []}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="p-6">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">Post Details</SheetTitle>
          </SheetHeader>
          {postDetails && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Title: {postDetails.title}</h2>
              <p className="mt-3 text-gray-700">Description: {postDetails.description}</p>
              <p className="mt-3 text-sm text-gray-500">
                Created by: {postDetails?.userId.name}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Created at: {new Date(postDetails.createdAt).toLocaleString()}
              </p>
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">Status History:</h2>
                <div className="mt-4 flex justify-between">
                  {statusOrder.map((status) => (
                    <div key={status} className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${getStatusColor(
                          status,
                          postDetails.status
                        )}`}
                      >
                        {isStatusReached(status, postDetails.status) && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="mt-2 text-xs text-gray-600">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Edit Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right font-medium">
                  Title
                </Label>
                <Input
                  id="title"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                  className="col-span-3 p-2 border rounded"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right font-medium">
                  Description
                </Label>
                <Input
                  id="description"
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3 p-2 border rounded"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right font-medium">
                  Status
                </Label>
                <select
                  id="status"
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, status: e.target.value })
                  }
                  className="col-span-3 p-2 border rounded"
                >
                  {statusOrder.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyPost;
