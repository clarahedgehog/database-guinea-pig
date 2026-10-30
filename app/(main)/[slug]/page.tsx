import { getSinglePost } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import DeleteButton from "./deleteButton"
import Link from "next/link"
import Comments from "./comments"
import AddComment from "./addComment"

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params
  const { data, error } = await getSinglePost(slug)

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isAuthor: boolean = user && data && user.id === data.author.id ? true : false

  return (
    <div className="flex flex-col justify-center font-montserrat bg-[url(/background2.png)] bg-cover grow text-shoe items-center">
      {data && <div className="rounded-xl lg:mb-4 m-8 lg:p-4 w-fit flex flex-col justify-center">
        <h1 className="heading">{data.title}</h1>
        {data.image && <img className="rounded-2xl aspect-square w-150 object-cover" src={data.image} alt={data.title} />}
        {data.content &&
          <div className="flex flex-col gap-5 pt-4">
            <p><span className="font-bold">Where we are / can meet: </span>{data.location}</p>
            <p><span className="font-bold">Race: </span>{data.race}</p>
            <p><span className="font-bold">Age: </span>{data.age}</p>
            <p><span className="font-bold">Castrated: </span>{data.castrated}</p>
            <p><span className="font-bold">Good to know: </span>{data.content}</p>
          </div>
        }
        <p className="italic my-8">Created by: {data.author.username}</p>
        {isAuthor &&
          <div className="flex justify-between">
            <DeleteButton id={data.id} />
            <Link className="cursor-pointer px-4 py-2 text-sm font-medium bg-hotpink hover:bg-pink-700 text-white rounded-xl mt-8" href={`/${slug}/edit`}>Edit Match</Link>
          </div>}
        {user && <Comments postid={data!.id} isAuthor={isAuthor} userId={user ? user.id : null} />}
        {user && <AddComment postId={data!.id} />}
      </div>
      }
    </div>
  )
}

export default PostPage