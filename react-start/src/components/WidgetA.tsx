import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"

const WidgetA = () => {
  const context = useContext(ThemeContext)
  if (!context) return null
  const { theme } = context
  return (
    <>
      <div style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
        <h2>Hello from Widget A</h2>
      </div>
    </>
  )
}

export default WidgetA