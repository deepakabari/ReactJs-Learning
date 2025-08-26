import { useParams, useNavigate } from 'react-router-dom'

export default function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <section className="card">
      <h2>User Detail</h2>
      <p>
        Param <code>id</code> is: <strong>{id}</strong>
      </p>
      <button className="btn outline" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </section>
  )
}
