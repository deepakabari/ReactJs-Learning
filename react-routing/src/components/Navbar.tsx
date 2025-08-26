import { Link, NavLink, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <header className="navbar glass">
      <Link to="/" className="brand">
        React Router Demo
      </Link>
      <nav className="nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
      <div className="nav-actions">
        <ThemeToggle />
        {user ? (
          <button
            className="btn"
            onClick={() => {
              logout()
              navigate('/')
            }}>
            Logout
          </button>
        ) : (
          <button className="btn" onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>
    </header>
  )
}
