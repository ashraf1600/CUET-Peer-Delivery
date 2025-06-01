"use client";
import { get } from "@/lib/api/handlers";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import TableComponent from "./TableComponent";

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

  const GetOwnPosts = async () => {
    const response = await get<Task[]>(`/api/posts/own/posts`, {
      Authorization: `Bearer ${session?.accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to fetch users");
    }

    return response;
  };

  const {
    data: ownPost,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["own-posts"],
    queryFn: GetOwnPosts,
  });

  console.log("ownPost", ownPost);

  const handleView = (task: Task) => {
    console.log("View task:", task);
    // Implement view logic here
  };

  const handleEdit = (task: Task) => {
    console.log("Edit task:", task);
    // Implement edit logic here
  };

  const handleDelete = (id: string) => {
    console.log("Delete task with ID:", id);
    // Implement delete logic here
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1>My Posts</h1>
      <TableComponent
        data={ownPost || []}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default MyPost;
