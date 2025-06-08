// "use client";

// import React from "react";
// import { useSession } from "next-auth/react";
// import { useParams } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { get } from "@/lib/api/handlers";
// import PostCard from "./PostCard";

// interface UserId {
//   _id: string;
//   name: string;
//   email: string;
// }

// interface PostDataType {
//   _id: string;
//   userId: UserId;
//   title: string;
//   description: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   statusHistory: any[];
// }

// const SinglePost = () => {
//   const { data: session } = useSession();
//   const params = useParams<{ postId: string }>();
//   const postId = params.postId;
//   const userId = session?.user?.id;

//   const fetchPost = async (): Promise<PostDataType> => {
//     const response = await get<PostDataType>(`/api/posts/user/${userId}`, {
//       params: { postId }
//     });

//     if (!response) {
//       throw new Error("Failed to fetch post");
//     }

//     return response;
//   };

//   const {
//     data: post,
//     isLoading,
//     error,
//   } = useQuery<PostDataType>({
//     queryKey: ["post", userId, postId],
//     queryFn: fetchPost,
//     enabled: !!userId && !!postId, // Ensure the query only runs when userId and postId are available
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="py-10">
//       <h1 className="mb-4 text-2xl font-bold">Post Details</h1>
//       {post && <PostCard post={post} />}
//     </div>
//   );
// };

// export default SinglePost;
