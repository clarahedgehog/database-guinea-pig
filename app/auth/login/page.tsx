import Link from "next/link"
import LogInForm from "./form"

const LogInPage = () => {
  return (
    <div className="text-center font-montserrat bg-[url(/background2.png)] bg-cover grow lg:m-0 m-8">
      <h1 className="lg:text-4xl lg:text-center lg:m-8 lg:my-8 text-2xl my-4"><span className="font-bold">Log In </span>To <span className="text-hotpink font-bold">Guinea Pig Tinder</span></h1>
      <LogInForm />
      <Link href="/auth/signup">Don't have an account? <span className="text-hotpink font-bold underline">Sign up here</span></Link>
    </div>
  )
}

export default LogInPage