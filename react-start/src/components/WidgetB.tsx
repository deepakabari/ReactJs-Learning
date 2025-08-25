import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"

const WidgetB = () => {
  const context = useContext(ThemeContext)
  if (!context) return null
  const { theme, setTheme } = context
  return (
    <>
      <h2>Widget B - Theme Switch</h2>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme  (Current: {theme})
      </button>
    </>
  )
}

export default WidgetB