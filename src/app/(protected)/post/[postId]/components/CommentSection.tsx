"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api/handlers";

interface Comment {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  text: string;
  createdAt: string;
}

interface CommentSectionProps {
  postId: string;
  accessToken: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  accessToken,
}) => {
  //   const [comments, setComments] = useState<Comment[]>([]);

  //   const fetchComments = async (): Promise<Comment[]> => {
  //     const response = await get<Comment[]>(`/api/posts/${postId}/comments`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     if (!response) {
  //       throw new Error("Failed to fetch comments");
  //     }

  //     return response;
  //   };

  //   const { isLoading, error } = useQuery<Comment[]>({
  //     queryKey: ["comments", postId],
  //     queryFn: fetchComments,
  //     onSuccess: (data) => {
  //       setComments(data);
  //     },
  //     enabled: !!postId,
  //   });

  //   if (isLoading) return <div>Loading comments...</div>;
  //   if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Comments</h2>
      {/* {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id} className="mb-2 p-2 border-b border-gray-200">
              <p className="font-medium">{comment.userId.name}</p>
              <p>{comment.text}</p>
              <p className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default CommentSection;
