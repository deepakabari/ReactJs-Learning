import { useSearchParams } from 'react-router-dom'

const CATEGORIES = [
  { id: 1, name: 'Keyboard', category: 'accessories' },
  { id: 2, name: 'Mouse', category: 'accessories' },
  { id: 3, name: 'Laptop', category: 'computers' },
  { id: 4, name: 'Monitor', category: 'displays' }
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const category = searchParams.get('category') || 'all'

  const filtered = CATEGORIES.filter(
    (p) =>
      (category === 'all' || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="card">
      <h2>Products</h2>
      <p>
        Demonstrates <code>useSearchParams</code> for filters/search.
      </p>
      <div className="toolbar">
        <input
          placeholder="Search…"
          value={query}
          onChange={(e) => setSearchParams({ query: e.target.value, category }, { replace: false })}
        />
        <select
          value={category}
          onChange={(e) => setSearchParams({ query, category: e.target.value }, { replace: false })}>
          <option value="all">All</option>
          <option value="accessories">Accessories</option>
          <option value="computers">Computers</option>
          <option value="displays">Displays</option>
        </select>
      </div>
      <ul className="cards">
        {filtered.map((p) => (
          <li key={p.id} className="mini-card">
            <h4>{p.name}</h4>
            <p className="muted">{p.category}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
