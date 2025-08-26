import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      className="btn outline"
      aria-label="Toggle theme"
      onClick={() => setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))}>
      Toggle Theme
    </button>
  )
}
