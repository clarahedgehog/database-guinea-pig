'use server'

import { uploadImage } from "@/lib/supabase/upload-image"
import { createPostSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import z from "zod"

export const EditPost = async ({ postdata, postId }: { postdata: z.infer<typeof createPostSchema>, postId: string }) => {
  const parsedData = createPostSchema.parse(postdata)
  const supabase = await createClient()

  const imageFile = postdata.image?.get('image')

  const { data: post, error } = await supabase.from("Posts").select("*").eq("id", postId).single()
  if (!post) throw new Error("Post does not exist")

  let imageUrl

  if (typeof imageFile !== "undefined") {
    if (!(imageFile instanceof File) && imageFile !== null) {
      throw Error("Image is not in a valid format")
    }
    imageUrl = imageFile ? await uploadImage(imageFile) : null
  } else {
    imageUrl = post.image
  }

  const { data: updatedPost } = await supabase.from("Posts").update({ ...parsedData, image: imageUrl })
    .eq("id", postId).select("slug").single().throwOnError()

  revalidatePath("/")
  redirect(`/${updatedPost.slug}`)
}