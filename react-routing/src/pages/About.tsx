export default function About() {
  return (
    <section className="card">
      <h2>About React Router</h2>
      <p>
        React Router enables client-side navigation in single-page applications (SPAs) without full
        page reloads. It offers declarative routes, nested layouts, dynamic URL params, search
        params, and route-based code splitting.
      </p>
      <div className="grid two">
        <div className="panel">
          <h3>✅ Why use it</h3>
          <ul>
            <li>Declarative API, works with React mental model</li>
            <li>Nested routes for layouts</li>
            <li>Dynamic params & search params</li>
            <li>
              Code splitting with <code>React.lazy</code>
            </li>
          </ul>
        </div>
        <div className="panel">
          <h3>⚠️ When not to use</h3>
          <ul>
            <li>Simple multi-page sites (use real pages or a static site generator)</li>
            <li>Server-side rendered apps that prefer file-based routing (Next.js)</li>
            <li>Very SEO-critical content where SSR/SSG routing is better</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
