import { Link } from 'react-router-dom'

const USERS = [
  { id: 1, name: 'Ada Lovelace' },
  { id: 2, name: 'Alan Turing' },
  { id: 3, name: 'Edsger Dijkstra' }
]

export default function Users() {
  return (
    <section className="card">
      <h2>Users</h2>
      <p>
        Click a user to navigate to a dynamic route: <code>/users/:id</code>.
      </p>
      <ul className="list">
        {USERS.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
