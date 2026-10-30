import { createClient } from "./browserClient"
import { type QueryData } from '@supabase/supabase-js'

export const getHomePosts = async (supabase: ReturnType<typeof createClient>) => {
  return await supabase.from('Posts')
    .select('id, image, title, slug, content, age, castrated, race, location, author("id", "username")')
    .order('created_at', { ascending: false })
}

export const getSinglePost = async (slug: string) => {
  const supabase = createClient()
  return await supabase.from('Posts')
    .select('id, image, title, content, age, castrated, race, location, author("id", "username")')
    .eq('slug', slug)
    .single()
}

export const searchPosts = async (searchTerm: string) => {
  const supabase = createClient()
  return await supabase.from('Posts')
    .select('title, slug')
    .textSearch('title', searchTerm)
}

export const getPostComments = async (postid: string) => {
  const supabase = createClient()
  const { data, error } = await supabase.from("Comments")
    .select('id, content, userid("id", "username")')
    .eq("postid", postid)
    .order('created_at', { ascending: false })

  if (error) console.log("Error", error)
  return data;
}

export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>;

export type SinglePostType = QueryData<ReturnType<typeof getSinglePost>>;

export type SearchResultsType = QueryData<ReturnType<typeof searchPosts>>;

export type CommentsType = QueryData<ReturnType<typeof getPostComments>>;

