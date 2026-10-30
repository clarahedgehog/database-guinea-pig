"use client"

import { EditPost } from '@/actions/edit-page-actions'
import { createPostSchema } from '@/actions/schemas'
import ErrorMessage from '@/components/ErrorMessage'
import { type Tables } from '@/lib/supabase/database.types'
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'

const EditPageForm = ({ initialValues, postId }: { initialValues: Pick<Tables<"Posts">, "title" | "content" | "race" | "age" | "location" | "castrated" | "image">, postId: string }) => {

  const postImageSchema = createPostSchema.omit({ image: true })
    .extend({ image: z.unknown().transform(value => { return value as FileList }).optional() })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(postImageSchema),
    defaultValues: {
      title: initialValues.title,
      content: initialValues.content || undefined,
      race: initialValues.race || undefined,
      age: initialValues.age || undefined,
      castrated: initialValues.castrated || undefined,
      location: initialValues.location || undefined,
      image: initialValues.image || undefined
    }
  })

  const { mutate, error } = useMutation({
    mutationFn: EditPost
  })

  return (
    <form onSubmit={handleSubmit(values => {

      let imageForm = undefined
      if (values.image && typeof values.image !== "string") {
        imageForm = new FormData()
        imageForm.append('image', values.image[0])
      }

      mutate({
        postdata: {
          title: values.title,
          content: values.content,
          race: values.race,
          age: values.age,
          castrated: values.castrated,
          location: values.location,
          image: imageForm
        }, postId
      })
    })}
      className="flex flex-col max-w-md m-auto border-hotorange border-2 rounded-2xl p-8 text-left mb-4">
      <label htmlFor="title">Name of pig</label>
      <input className="input" {...register("title")} placeholder="write name of the pig..."></input>
      {errors.title && <ErrorMessage error={errors.title.message!} />}
      <label htmlFor="location">Where we are / can meet</label>
      <input className="input" {...register("location")} placeholder="location..."></input>
      <label htmlFor="race">Add race of guinea pig</label>
      <input className="input" {...register("race")} placeholder="e.g. American, Abyssinian, Silkie..."></input>
      <label htmlFor="age">Add age of guinea pig</label>
      <input className="input" {...register("age")} placeholder="e.g. 4 years, 8 months..."></input>
      <label htmlFor="castrated">Is the pig castrated?</label>
      <input className="input" {...register("castrated")} placeholder="yes or no..."></input>
      <label htmlFor="content">Good to know about the pig (optional)</label>
      <textarea className="input" {...register("content")} placeholder="e.g. picky eater, hates getting nails trimmed..."></textarea>

      {initialValues.image && <img src={initialValues.image} alt={initialValues.title} />}

      <label htmlFor="image">Change the image (optional)</label>
      <input className="input text-shoe" type="file" {...register("image")}></input>

      <button className="cursor-pointer py-1">Publish Match</button>
      <div className="w-10 self-center">
        <img src="../heart.webp" height="100%" width="auto" />
      </div>
    </form>
  )
}

export default EditPageForm