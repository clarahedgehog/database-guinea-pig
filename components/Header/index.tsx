import Link from "next/link"
import AccountLinks from "./accountLinks"
import Search from "./search"

const Header = () => {
  return (
    <header className="flex flex-col lg:flex-row justify-between items-center p-4 border-b-2 border-hotpink bg-white text-shoe font-montserrat gap-4 lg:gap-0">
      <div className="flex items-center justify-between w-full lg:w-auto">
        <div className="flex items-center">
          <div className="w-20">
            <img src="./logo.webp" alt="Logo" height="100%" width="auto" />
          </div>
          <Link href="/" className="button">Guinea Pig Tinder</Link>
        </div>
        <div className="lg:hidden">
          <AccountLinks />
        </div>
      </div>
      <Search />
      <div className="hidden lg:block">
        <AccountLinks />
      </div>
    </header>
  )
}

export default Header