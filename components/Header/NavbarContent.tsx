"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut } from "@/actions/logout-actions"

interface NavbarContentProps {
  user: any
}

export default function NavbarContent({ user }: NavbarContentProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none">
        <span className="block w-6 h-0.5 bg-shoe" />
        <span className="block w-6 h-0.5 bg-shoe" />
        <span className="block w-6 h-0.5 bg-shoe" />
      </button>
      <div className="hidden lg:flex lg:gap-5 items-center">
        {user ? (
          <>
            <div onClick={() => LogOut()} className="button-secondary cursor-pointer">Log Out</div>
            <Link className="button-secondary" href="/create">Publish Match</Link>
          </>
        ) : (
          <>
            <Link className="button-secondary" href="/auth/login">Log In</Link>
            <Link className="button-secondary" href="/auth/signup">Sign Up</Link>
          </>
        )}
      </div>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-lg flex flex-col p-4 gap-3 lg:hidden z-50">
          {user ? (
            <>
              <div
                onClick={() => { setIsOpen(false); LogOut(); }}
                className="button-secondary cursor-pointer text-center">
                Log Out
              </div>
              <Link
                onClick={() => setIsOpen(false)}
                className="button-secondary text-center"
                href="/create">
                Publish Match
              </Link>
            </>
          ) : (
            <>
              <Link
                onClick={() => setIsOpen(false)}
                className="button-secondary text-center"
                href="/auth/login">
                Log In
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="button-secondary text-center"
                href="/auth/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}