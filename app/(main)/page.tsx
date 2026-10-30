import HomePosts from "@/components/HomePosts";
import { createClient } from "@/lib/supabase/serverClient";
import { getHomePosts } from "@/lib/supabase/queries";

export const revalidate = 600;
export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await getHomePosts(supabase)

  return (
    <div className="m-8 font-montserrat text-shoe">
      <div className="heading">
        Welcome to <span className="text-hotpink font-bold">Tinder</span> but for Guinea Pigs!
      </div>
      <p className="m-8 text-center">Are your guinea pig looking for a new partner in crime? 🐹💕 <br></br> Whether it’s a romantic match or a new best friend, be ready for your guinea pig to meet someone special. <br></br>Someone to share snacks, cozy naps, endless zoomies, and lots of squeaky adventures with!</p>
      {data && <HomePosts posts={data} />}
    </div>
  );
}