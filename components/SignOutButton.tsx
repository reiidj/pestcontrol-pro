import { signout } from '@/app/auth/actions'

export default function SignOutButton() {
  return (
    <form action={signout}>
      <button 
        type="submit"
        className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
      >
        Sign Out
      </button>
    </form>
  )
}