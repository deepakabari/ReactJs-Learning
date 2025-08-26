import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="hero card">
      <h1>React Router Demo</h1>
      <p>
        Learn routing by exploring real examples: basic routes, nested routes, dynamic params,
        search params, protected routes, and lazy loading.
      </p>
      <div className="grid two">
        <div className="panel">
          <h3>Start here</h3>
          <ul>
            <li>
              <Link to="/about">What is React Router?</Link>
            </li>
            <li>
              <Link to="/users">Dynamic routes &amp; params</Link>
            </li>
            <li>
              <Link to="/products">Search params (filters)</Link>
            </li>
          </ul>
        </div>
        <div className="panel">
          <h3>Hands-on</h3>
          <ul>
            <li>
              <Link to="/dashboard">Nested routes &amp; layouts</Link>
            </li>
            <li>
              <Link to="/login">Protected routes demo</Link>
            </li>
            <li>
              <Link to="/contact">Programmatic navigation</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
