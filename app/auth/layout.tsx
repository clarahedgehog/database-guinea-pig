import Link from "next/link"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="flex p-4 border-b-2 border-hotpink text-shoe font-montserrat items-center">
        <div className="w-20">
          <img src="../logo.webp" height="100%" width="auto" />
        </div>
        <Link href="/" className="button">Guinea Pig Tinder</Link>
      </header>
      {children}
    </>
  )
}

export default AuthLayout