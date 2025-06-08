"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api/handlers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfile {
  _id: string;
  stdId: string;
  name: string;
  email: string;
  hallName: string;
  description: string;
  role: string;
  __v: number;
}

const MyDetails = () => {
  const { data: session } = useSession();

  const fetchUserProfile = async (): Promise<UserProfile> => {
    const response = await get<UserProfile>(`/api/users/profile`, {
      Authorization: `Bearer ${session?.accessToken}`,
    });

    if (!response) {
      throw new Error("Failed to fetch user profile");
    }

    return response;
  };

  const {
    data: userProfile,
    isLoading,
    error,
  } = useQuery<UserProfile>({
    queryKey: ["user-profile"],
    queryFn: fetchUserProfile,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/path/to/avatar.jpg" alt="Profile Picture" />
          <AvatarFallback>
            {userProfile?.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="text-start">
        <p className="my-4 text-gray-800">Bio: {userProfile?.description}</p>
        <h1 className="text-xl font-bold">Name: {userProfile?.name}</h1>
        <p className="text-gray-600">Email: {userProfile?.email}</p>
        <p className="text-gray-600">Student ID: {userProfile?.stdId}</p>
        <p className="text-gray-600">Hall: {userProfile?.hallName}</p>
        <p className="text-gray-600">Role: {userProfile?.role}</p>
      </div>
    </div>
  );
};

export default MyDetails;
