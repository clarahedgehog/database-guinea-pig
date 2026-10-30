import { z } from 'zod'

export const logInSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(5, "Invalid password")
})

export const signUpSchema = z.object({
  username: z.string().min(6, "Your username needs to be at least 6 characters long"),
  email: z.email("Invalid email"),
  password: z.string().min(5, "Invalid password, it needs to be at least 6 characters long")
})

export const createPostSchema = z.object({
  title: z.string().min(2, "Your title must be at least 2 characters long"),
  content: z.string().optional(),
  location: z.string(),
  race: z.string(),
  age: z.string(),
  castrated: z.string(),
  image: z.instanceof(FormData).optional()
})

export const commentSchema = z.object({
  content: z.string().min(3, "Comments must be at least 3 characters long")
})