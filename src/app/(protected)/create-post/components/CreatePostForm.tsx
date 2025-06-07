"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { post } from "@/lib/api/handlers";
import toast from "react-hot-toast";

const CreatePostForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (newPost: { title: string; description: string }) => {
      return post("/api/posts", newPost, {
        Authorization: `Bearer ${session?.accessToken}`,
      });
    },
    onSuccess: () => {
      toast.success("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create post: ${error.message}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(values: { title: string; description: string }) {
    mutation.mutate(values);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md space-y-8 p-4"
    >
      <h1 className="mb-4 flex items-center justify-center text-2xl font-bold text-blue-500">
        Create Post
      </h1>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <Input
          id="title"
          placeholder="Title"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {errors.title.message as string}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message as string}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full cursor-pointer rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Submit
      </Button>
    </form>
  );
};

export default CreatePostForm;
