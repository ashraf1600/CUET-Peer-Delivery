"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api/handlers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

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

  if (isLoading) return <div className="text-blue-600 font-medium">Loading...</div>;
  if (error) return <div className="text-red-600">Error: {error.message}</div>;

  const initials =
    userProfile?.name
      .split(" ")
      .map((n) => n[0])
      .join("") || "";

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-blue-100">
      <div className="flex flex-col items-center space-y-4 mb-6">
        <Avatar className="h-24 w-24 ring-4 ring-blue-500 ring-opacity-30">
          <AvatarImage src="/path/to/avatar.jpg" alt="Profile Picture" />
          <AvatarFallback className="text-xl font-semibold text-blue-800">
            {initials}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-blue-800">{userProfile?.name}</h1>
        <p className="text-gray-500 italic">{userProfile?.description || "No bio provided."}</p>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold text-blue-700">Email:</span>{" "}
          {userProfile?.email}
        </p>
        <p>
          <span className="font-semibold text-blue-700">Student ID:</span>{" "}
          {userProfile?.stdId}
        </p>
        <p>
          <span className="font-semibold text-blue-700">Hall:</span>{" "}
          {userProfile?.hallName}
        </p>
        <p>
          <span className="font-semibold text-blue-700">Role:</span>{" "}
          {userProfile?.role}
        </p>
      </div>

      <div className="mt-6 text-center">
        <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-6 py-2 rounded-md shadow-sm hover:shadow-md transition-all">
          <Pencil className="h-4 w-4 mr-2" />
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default MyDetails;
