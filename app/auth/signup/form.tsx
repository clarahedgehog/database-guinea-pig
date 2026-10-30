"use client"

import { signUpSchema } from "@/actions/schemas"
import { SignUp } from "@/actions/sign-up"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

const SignUpForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema)
  })

  const { mutate, error, isPending } = useMutation({
    mutationFn: SignUp
  })

  return (
    <div>
      <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col max-w-md m-auto border-hotorange border-2 rounded-2xl p-8 text-left mb-4">
        <label htmlFor="username">Enter a username</label>
        <input className="input" {...register("username")} placeholder="enter a username..." />
        {errors.email && <ErrorMessage error={errors.username!.message!} />}
        <label htmlFor="email">Enter a email</label>
        <input className="input" {...register("email")} placeholder="enter a email..." />
        {errors.email && <ErrorMessage error={errors.email.message!} />}
        <label htmlFor="password">Enter a password</label>
        <input className="input" {...register("password")} placeholder="enter a password..." type="password" />
        {errors.email && <ErrorMessage error={errors.password!.message!} />}
        <button className="cursor-pointer py-1">Sign Up!</button>
        <div className="w-10 self-center">
          <img src="../heart.webp" height="100%" width="auto" />
        </div>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  )
}

export default SignUpForm