import { useAuth } from '@/context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  return (
    <div>
      <h3>Welcome, {user?.name} 👋</h3>
      <p>This is a protected nested route.</p>
    </div>
  )
}
