"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { commentSchema } from '@/actions/schemas'
import { AddCommentAction } from "@/actions/add-comment-actions"
import { toast } from 'sonner'

const AddComment = ({ postId }: { postId: string }) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(commentSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: AddCommentAction,
    onSuccess: () => reset(),
    onSettled: () => toast("Added a comment")
  })

  return (
    <form className='flex flex-col gap-3 p-5 bg-white dark:bg-slate-900 border border-slate-200 rounded-2xl shadow-sm' onSubmit={handleSubmit(values => mutate({ commentData: { content: values.content }, postId }))}>
      <label htmlFor="content" className="font-bold text-shoe">Leave a comment</label>
      <textarea {...register("content")} placeholder="Add your comment here..." className="w-full p-3 rounded-xl border border-slate-200 text-shoe focus:outline-none focus:ring-2 focus:ring-hotpink resize-none transition-all" />
      {errors.content && <ErrorMessage error={errors.content.message!} />}
      <div className="flex justify-end">
        <button
          type="submit"
          className="cursor-pointer px-4 py-2 text-sm font-medium bg-hotpink hover:bg-pink-700 text-white rounded-xl">
          Add comment
        </button>
      </div>
    </form>
  )
}

export default AddComment