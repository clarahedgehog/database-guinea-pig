"use client"

import { createPostSchema } from "@/actions/schemas"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import ErrorMessage from "@/components/ErrorMessage"
import { CreatePost } from "@/actions/create-post-actions"
import z from "zod"

const CreatePostPage = () => {

  const postImageSchema = createPostSchema.omit({ image: true })
    .extend({ image: z.unknown().transform(value => { return value as FileList }).optional() })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(postImageSchema)
  })

  const { mutate, error } = useMutation({
    mutationFn: CreatePost
  })

  return (
    <div className="font-montserrat bg-[url(/background2.png)] bg-cover grow m-8 lg:m-0">
      <h1 className="heading">Publish a <span className="font-bold text-hotpink">Match</span></h1>
      <form onSubmit={handleSubmit(values => {
        const imageForm = new FormData()
        if (values.image) imageForm.append('image', values.image[0])
        mutate({
          title: values.title,
          content: values.content,
          race: values.race,
          age: values.age,
          castrated: values.castrated,
          location: values.location,
          image: imageForm
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

        <label htmlFor="image">Add an Image (optional)</label>
        <input className="input text-shoe cursor-pointer" type="file" {...register("image")}></input>
        {errors.image && <ErrorMessage error={errors.image.message!} />}

        <button className="cursor-pointer py-1">Publish Match</button>
        <div className="w-10 self-center">
          <img src="../heart.webp" height="100%" width="auto" />
        </div>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  )
}

export default CreatePostPage