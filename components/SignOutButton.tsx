import { signout } from '@/app/auth/actions'
import { LogOut } from 'lucide-react'

export default function SignOutButton() {
  return (
    <form action={signout}>
      <button 
        type="submit" 
        title="Sign Out"
        className="text-[#c33319] hover:text-[#9B1C1C] transition-colors p-1"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </form>
  )
}