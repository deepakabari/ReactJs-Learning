import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { FormEvent, useState } from 'react'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const from = location.state?.from?.pathname
  const [name, setName] = useState<string>("")

  function handleLogin(e: FormEvent) {
    e.preventDefault()
    login(name)
    navigate(from, { replace: true })
  }

  return (
    <section className="card">
      <h2>Login</h2>
      <p className="muted">This is a demo auth flow using context + localStorage.</p>
      <form className="form" onSubmit={handleLogin}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Username" />
        <button className="btn">Login</button>
      </form>
    </section>
  )
}
