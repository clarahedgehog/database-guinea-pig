"use client"

import { LogIn } from "@/actions/login-actions"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { logInSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { useMutation } from "@tanstack/react-query"

const LogInForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(logInSchema)
  })

  const { mutate, error, isPending } = useMutation({
    mutationFn: LogIn
  })

  return (
    <div>
      <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col max-w-md m-auto border-hotorange border-2 rounded-2xl p-8 text-left mb-4">
        <label htmlFor="email">Enter a email</label>
        <input className="input" {...register("email")} placeholder="enter a email..." />
        {errors.email && <ErrorMessage error={errors.email.message!} />}
        <label htmlFor="password">Enter a password</label>
        <input className="input" {...register("password")} placeholder="enter a password..." type="password" />
        {errors.password && <ErrorMessage error={errors.password.message!} />}
        <button className="cursor-pointer py-1">{isPending ? "Logging in" : "Log In"}</button>
        <div className="w-10 self-center">
          <img src="../heart.webp" height="100%" width="auto" />
        </div>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  )
}

export default LogInForm