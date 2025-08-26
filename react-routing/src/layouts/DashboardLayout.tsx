import { NavLink, Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <section className="card">
      <h2>📊 Dashboard</h2>
      <p className="muted">This layout demonstrates nested routes using &lt;Outlet /&gt;.</p>
      <div className="tabs">
        <NavLink to="profile">Profile</NavLink>
        <NavLink to="settings">Settings</NavLink>
        <NavLink to="reports">Reports</NavLink>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </section>
  )
}
