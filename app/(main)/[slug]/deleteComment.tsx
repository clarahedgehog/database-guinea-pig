"use client"

import { DeleteCommentAction } from "@/actions/delete-comment-actions"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeleteComment = ({ commentId }: { commentId: string }) => {

  const { mutate, isPending } = useMutation({
    mutationFn: DeleteCommentAction,
    onSettled: () => toast("Your comment has been deleted", { position: "top-center" })
  })

  return (
    <button onClick={() => mutate(commentId)} className="cursor-pointer px-4 py-2 text-sm font-medium bg-hotpink hover:bg-pink-700 text-white rounded-xl">{isPending ? "Deleting Comment..." : "Delete Comment"}</button>
  )
}

export default DeleteComment