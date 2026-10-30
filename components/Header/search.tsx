"use client"

import { searchPosts, SearchResultsType } from "@/lib/supabase/queries"
import Link from "next/link"
import { SetStateAction, useState } from "react"

const Search = () => {
  const [input, setInput] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchResultsType | null>(null)

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value)
  }

  const handleClick = async () => {
    const { data, error } = await searchPosts(input)
    if (error) throw new Error
    setSearchResults(data)
  }

  return (
    <div className="relative flex">
      <div className="flex align-center gap-3 border border-slate-200 rounded-2xl">
        <input className="px-8 focus:outline-none focus:ring-2 focus:ring-hotpink resize-none transition-all rounded-2xl" onChange={handleChange} placeholder="Search for a match..." value={input} />
        <button className="cursor-pointer py-2 px-4 bg-hotpink rounded-2xl text-white" onClick={handleClick}>Search</button>
      </div>
      {searchResults &&
        <div className="absolute left-0 top-full w-full bg-white">
          {searchResults.map((result, index) =>
            <Link className="block border border-shoe rounded-2xl p-2 hover:bg-hotpink hover:text-white" key={index} href={`/${result.slug}`}>{result.title}</Link>)
          }
        </div>}
    </div>
  )
}

export default Search