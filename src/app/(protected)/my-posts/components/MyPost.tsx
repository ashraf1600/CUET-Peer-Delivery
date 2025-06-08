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

  // get all own posts
  const getOwnPosts = async () => {
    const response = await get<Task[]>(`/api/posts/own/posts`, {
      Authorization: `Bearer ${session?.accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to fetch posts");
    }

    return response;
  };

  // update post
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
    mutationFn: ({
      postId,
      updatedData,
    }: {
      postId: string;
      updatedData: Partial<Task>;
    }) => updatePost(postId, updatedData),
    onMutate: async (newPostData) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic updates
      await queryClient.cancelQueries({ queryKey: ["own-posts"] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData<Task[]>(["own-posts"]);

      // Optimistically update to the new value
      queryClient.setQueryData<Task[]>(["own-posts"], (oldPosts = []) =>
        oldPosts.map((post) =>
          post._id === newPostData.postId
            ? { ...post, ...newPostData.updatedData }
            : post,
        ),
      );

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", selectedPost?._id] });
      toast.success("Post updated successfully!");
      setIsEditDialogOpen(false);
    },
    onError: (error, variables, context) => {
      // Rollback to the previous value if the mutation fails
      if (context?.previousPosts) {
        queryClient.setQueryData(["own-posts"], context.previousPosts);
      }
      toast.error(`Error: ${error.message}`);
    },
    onSettled: () => {
      // Ensure that the query is refetched after the mutation is settled
      queryClient.invalidateQueries({ queryKey: ["own-posts"] });
    },
  });

  //get post by id
  const getPostById = async (postId: string): Promise<Task> => {
    const response = await get<Task>(`/api/posts/${postId}`, {
      Authorization: `Bearer ${session?.accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to fetch post");
    }

    return response;
  };
  //delete method
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
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
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <select
                  id="status"
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, status: e.target.value })
                  }
                  className="col-span-3 rounded border p-2"
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
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyPost;
