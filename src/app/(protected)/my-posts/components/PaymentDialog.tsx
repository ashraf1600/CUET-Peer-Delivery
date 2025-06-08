// PaymentDialog.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { put } from "@/lib/api/handlers";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

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

interface PaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  postId: string;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  isOpen,
  onOpenChange,
  postId,
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");

  const updatePostStatus = async () => {
    const response = await put(
      `/api/posts/${postId}`,
      { status: "Completed" },
      {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    );

    if (!response) {
      throw new Error("Failed to update post status");
    }

    return response;
  };

  const { mutate } = useMutation({
    mutationFn: updatePostStatus,
    onMutate: async () => {
      // Cancel any outgoing refetches to avoid overwriting optimistic updates
      await queryClient.cancelQueries({ queryKey: ["own-posts"] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData<Task[]>(["own-posts"]);

      // Optimistically update to the new value
      queryClient.setQueryData<Task[]>(["own-posts"], (oldPosts = []) =>
        oldPosts.map((post) =>
          post._id === postId ? { ...post, status: "Completed" } : post,
        ),
      );

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["own-posts"] });
      toast.success("Payment successful and post status updated!");
      onOpenChange(false);
    },
    onError: (error, variables, context) => {
      // Rollback to the previous value if the mutation fails
      if (context?.previousPosts) {
        queryClient.setQueryData(["own-posts"], context.previousPosts);
      }
      toast.error(`Error: ${error.message}`);
    },
    onSettled: () => {
      // Ensure that the query is refetched after the mutation is settled
      queryClient.invalidateQueries({ queryKey: ["own-posts"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paymentMethod" className="text-right">
                Payment Method
              </Label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="col-span-3 rounded border p-2"
              >
                <option value="">Select a method</option>
                <option value="bkash">bKash</option>
                <option value="nagad">Nagad</option>
                <option value="rocket">Rocket</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
