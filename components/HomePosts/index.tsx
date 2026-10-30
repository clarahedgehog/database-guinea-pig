"use client"

import { HomePostType } from "@/lib/supabase/queries"
import Link from "next/link"
import { createClient } from "@/lib/supabase/browserClient"

const HomePosts = ({ posts }: { posts: HomePostType }) => {
  const supabase = createClient()

  return (
    <div className="lg:grid lg:grid-cols-4 flex flex-col gap-4 text-shoe">
      {posts.map(post =>
        <Link key={post.id} className="block rounded-xl border border-shoe p-8 text-shoe" href={`/${post.slug}`}>
          {post.image && <img className="aspect-square w-full object-cover rounded-2xl" src={post.image} alt={post.title} />}
          <h3 className="font-bold text-2xl text-shoe pb-4 pt-4">{post.title}</h3>
          <div className="flex flex-col gap-5">
            <p><span className="font-bold">Where we are / can meet: </span>{post.location}</p>
            <p><span className="font-bold">Age: </span>{post.age}</p>
            <p className="text-hotpink font-bold underline">Click to read more!</p>
            <p className="text-left italic">Posted by: {post.author.username}</p>
          </div>
        </Link>)}
    </div>
  )
}

export default HomePosts