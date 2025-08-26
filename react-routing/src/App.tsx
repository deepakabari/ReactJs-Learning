import { Routes, Route, Navigate } from 'react-router-dom'
import './styles/global.css'
import { lazy, Suspense } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import RequireAuth from './utils/RequireAuth'
import NotFound from './pages/NotFound'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Users = lazy(() => import('./pages/Users'))
const UserDetail = lazy(() => import('./pages/UserDetail'))
const Products = lazy(() => import('./pages/Products'))
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'))
const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))
const Reports = lazy(() => import('./pages/Reports'))

const App = () => {
  return (
    <AuthProvider>
      <div className="app-shell">
        <Navbar />
        <main className="container">
          <Suspense
            fallback={
              <div className="loader" aria-busy>
                Loading route...
              </div>
            }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetail />} />
              <Route path="/products" element={<Products />} />

              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <DashboardLayout />
                  </RequireAuth>
                }>
                <Route index element={<Navigate to="profile" replace />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="reports" element={<Reports />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
