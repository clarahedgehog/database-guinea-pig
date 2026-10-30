import { createClient } from "@/lib/supabase/serverClient"
import NavbarContent from "./NavbarContent"

const AccountLinks = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return <NavbarContent user={user} />
}

export default AccountLinks

