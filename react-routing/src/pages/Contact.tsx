import { useNavigate } from 'react-router-dom'

export default function Contact() {
  const navigate = useNavigate()
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate('/')
  }
  return (
    <section className="card">
      <h2>Contact Us</h2>
      <p>
        Submit the form to see programmatic navigation using <code>useNavigate</code>.
      </p>
      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Your name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Message" rows={4} required />
        <button className="btn">Send</button>
      </form>
    </section>
  )
}
