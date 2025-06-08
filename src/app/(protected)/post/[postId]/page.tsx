// app/post/[postId]/page.tsx
"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import PostDetails from "./components/PostDetails";
import { Container } from "@/components/shared/Container";

const Page = () => {
  const { data: session } = useSession();
  const params = useParams<{ postId: string }>();
  const postId = params.postId;

  return (
    <Container>
      <div className="py-10">
        <h1 className="mb-4 text-2xl font-bold">Post Details</h1>
        {postId && session?.accessToken && (
          <PostDetails postId={postId} accessToken={session.accessToken} />
        )}
      </div>
    </Container>
  );
};

export default Page;
