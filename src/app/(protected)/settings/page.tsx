
import { useSession } from "next-auth/react"

import { logout } from "@/actions/logout"
import { Button } from "@/components/ui/button"
import { SettingsPage } from "@/components/protected/settings/SettingsPage"

const Page = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <SettingsPage />
    </div>
  )
}
export default Page;