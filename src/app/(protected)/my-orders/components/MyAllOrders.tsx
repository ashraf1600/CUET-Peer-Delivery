"use client";

import { Check } from "lucide-react";
import { del, get, put } from "@/lib/api/handlers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

const MyAllOrders = () => {
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
  const MyAllOrders = async () => {
    const response = await get<Task[]>(`/api/orders`, {
      Authorization: `Bearer ${session?.accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to fetch posts");
    }

    return response;
  };

  //get post by id
  const getOrdersById = async (orderId: string): Promise<Task> => {
    const response = await get<Task>(`/api/orders/${orderId}`, {
      Authorization: `Bearer ${session?.accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to fetch post");
    }

    return response;
  };

  const {
    data: ownPost,
    isLoading,
    error,
  } = useQuery<Task[]>({
    queryKey: ["own-posts"],
    queryFn: MyAllOrders,
  });

  React.useEffect(() => {
    if (ownPost) {
      setOwnPosts(ownPost);
    }
  }, [ownPost]);

  const { data: postDetails } = useQuery<Task>({
    queryKey: ["post", selectedPost?._id],
    queryFn: () => getOrdersById(selectedPost!._id),
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="py-4">
      <h1 className="flex justify-center py-5 text-2xl font-bold">My Orders</h1>
      <TableComponent data={ownPost || []} onView={handleView} />

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

export default MyAllOrders;
