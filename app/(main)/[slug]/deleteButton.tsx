"use client"

import { DeletePost } from "@/actions/delete-actions"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeleteButton = ({ id }: { id: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: DeletePost,
    onSettled: () => toast("Your post has been deleted", { position: "top-center" })
  })

  return (
    <button onClick={() => mutate(id)} className="cursor-pointer px-4 py-2 text-sm font-medium bg-hotpink hover:bg-pink-700 text-white rounded-xl mt-8">{isPending ? "Deleting Match..." : "Delete Match"}</button>
  )
}

export default DeleteButton