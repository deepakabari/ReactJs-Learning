import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="card">
      <h2>404 - Not Found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <Link className="btn" to="/">
        Back to Home
      </Link>
    </section>
  )
}
