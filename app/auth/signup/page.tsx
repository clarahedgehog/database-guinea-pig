import Link from "next/link"
import SignUpForm from "./form"

const SignUpPage = () => {
  return (
    <div className="text-center font-montserrat bg-[url(/background2.png)] bg-cover grow lg:m-0 m-8">
      <h1 className="lg:text-4xl lg:text-center lg:m-8 lg:my-8 text-2xl my-4"><span className="font-bold">Sign Up</span> To Find Your <span className="text-hotpink font-bold">Guinea Pig's Perfect Match</span> Today!</h1>
      <p className="lg:m-8 my-4">Are your guinea pig looking for a new partner in crime? 🐹💕 <br></br> Whether it’s a romantic match or a new best friend, be ready for your guinea pig to meet someone special. <br></br>Someone to share snacks, cozy naps, endless zoomies, and lots of squeaky adventures with!</p>
      <SignUpForm />
      <Link href="/auth/login">Already have an account? <span className="text-hotpink font-bold underline">Log in here</span> </Link>
    </div>
  )
}

export default SignUpPage