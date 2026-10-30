import { getPostComments } from "@/lib/supabase/queries"
import DeleteComment from "./deleteComment"

const Comments = async ({ postid, isAuthor, userId }: { postid: string, isAuthor: boolean, userId: string | null }) => {
  const comments = await getPostComments(postid)

  return (
    <div className="space-y-4 my-6">
      <h3 className="font-bold text-shoe">Comments</h3>
      {comments && comments.length ? (
        <div className="space-y-3">
          {comments.map(comment => (
            <div key={comment.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-2 shadow-sm">
              <p className="text-shoe leading-relaxed">{comment.content}</p>
              <div className="flex lg:flex-row gap-2.5 lg:gap-0 lg:items-center justify-between mt-1 pt-2 border-t border-slate-200 flex-col">
                <p className="italic text-shoe-">By {comment.userid.username}</p>
                {(isAuthor || (userId === comment.userid.id)) && (
                  <div className="">
                    <DeleteComment commentId={comment.id} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-slate-200">
          <h2 className="text-shoe">Start the conversation</h2>
        </div>
      )}
    </div>
  )
}

export default Comments