"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { FileText, MessageCircle } from "lucide-react";
import PostDetails from "./components/PostDetails";
import { Container } from "@/components/shared/Container";
import Link from "next/link";

const Page = () => {
  const { data: session } = useSession();
  const params = useParams<{ postId: string }>();
  const postId = params.postId;
  const router = useRouter();

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4 md:px-10">
      <Container>
        <div className="max-w-full mx-auto bg-white rounded-xl shadow-md p-6 md:p-10 border border-blue-100">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-blue-700" />
              <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
                Post Details
              </h1>
            </div>

            {/* Message Button */}
            <Link
              href={`/messages?postId=${postId}`}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              <MessageCircle className="h-4 w-4" />
              Message
            </Link>
          </div>

          {/* Content */}
          {postId && session?.accessToken ? (
            <PostDetails postId={postId} accessToken={session.accessToken} />
          ) : (
            <p className="text-gray-500 italic">Loading or unauthorized...</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Page;
