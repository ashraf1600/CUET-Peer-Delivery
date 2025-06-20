"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { post, get } from "@/lib/api/handlers";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the structure of a comment
interface Comment {
  _id: string;
  userId: {
    _id: string;
    name: string;
    role: string;
  };
  text: string;
  name?: string;
  role?: string;
  createdAt: string;
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");

  const fetchComments = async (): Promise<Comment[]> => {
    try {
      const response = await get<{ comments: Comment[] }>(
        `/api/posts/${postId}/comments`,
        {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      );

      if (!response) {
        throw new Error("Failed to fetch comments");
      }

      // Ensure that the response is an array of comments
      if (Array.isArray(response)) {
        return response;
      } else if (response.comments && Array.isArray(response.comments)) {
        return response.comments;
      } else {
        console.error("Unexpected response structure:", response);
        return [];
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  };

  const addComment = async (): Promise<void> => {
    try {
      const response = await post(
        `/api/posts/${postId}/comments`,
        {
          text: commentText,
          name: session?.user?.name,
          role: session?.user?.role,
        },
        {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      );

      if (!response) {
        throw new Error("Failed to add comment");
      }

      toast.success("Comment added successfully!");
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: fetchComments,
  });

  const { mutate } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    mutate();
  };

  useEffect(() => {
    console.log("Comments fetched:", comments);
  }, [comments]);

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Error loading comments: {error.message}</div>;

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col">
      <h2 className="mb-4 text-xl font-bold text-blue-500">Comments :</h2>
      <div className="flex-grow space-y-4 overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-start space-x-3 rounded border p-4"
            >
              <Avatar>
                <AvatarImage src="/path-to-avatar.jpg" alt="User Avatar" />
                <AvatarFallback>
                  {comment.name
                    ? comment.name.charAt(0)
                    : comment.userId.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-blue-500">
                    {comment.name || comment.userId.name}
                  </span>{" "}
                  <span className="text-blue-500">|</span>
                  <span className="text-sm text-blue-500">
                    {comment.role || comment.userId.role}
                  </span>
                </div>
                <p className="mt-2">{comment.text}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-blue-800">No comments yet.</p>
        )}
      </div>
      <div className="py-10">
        <form onSubmit={handleSubmit} className="">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="comment" className="text-blue-800">
              Add a comment
            </Label>
            <textarea
              id="comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment here..."
              className="mb- h-24 border"
            />
            <Button
              type="submit"
              className="w-fit cursor-pointer bg-blue-500 text-white"
            >
              Submit Comment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
