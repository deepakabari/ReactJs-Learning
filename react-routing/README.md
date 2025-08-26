# 🧭 React Router Demo

A hands-on playground covering **all core React Router v6 concepts** with attractive UI and a clear learning path.
New developers can clone, run, read, and experiment to build routing intuition fast.

## ✨ Highlights

- **BrowserRouter** implementation (with notes on HashRouter).
- **Basic & Nested Routes** using `<Routes>`, `<Route>`, and `<Outlet>`.
- **Dynamic Segments** (`/users/:id`) and **Programmatic Navigation** (`useNavigate`).
- **Search Params** filters with `useSearchParams`.
- **Protected Routes** with a minimal Auth context + `<Navigate>` redirects.
- **Lazy Loading** routes using `React.lazy` + `<Suspense>`.
- Colorful, modern **CSS** with light/dark theme toggle.
- Clear **pros, cons, and when not to use**.

## 🧰 Stack

- Vite + React + TypeScript
- React Router DOM v6
- No CSS frameworks—just modern CSS with variables, gradients, and glassmorphism

## 🚀 Setup

```bash
npm install
npm run dev
```

> Default dev server: http://localhost:5173

### SPA Fallback (for BrowserRouter)

If you deploy behind a static host, you need to **serve `index.html` for unknown routes**.

- Vite Preview/Dev: handled for you.
- Netlify: add a `_redirects` file with `/*  /index.html  200`.
- GitHub Pages or restrictive hosts: consider **HashRouter** or configure rewrites.

## 📂 Structure

```
src/
  components/         Navbar, ThemeToggle, Footer
  context/            Auth context (demo)
  layouts/            DashboardLayout (nested routes + Outlet)
  pages/              All example pages
  utils/              RequireAuth (protected route HOC)
  styles/             global.css (themes, gradients, glassmorphism)
  App.tsx             Routes
  main.tsx            Router + App bootstrap
```

## 🧭 Routes Overview

- `/` – Home (links to scenarios)
- `/about` – Why/When to use React Router (pros & limitations)
- `/contact` – Programmatic navigation with `useNavigate`
- `/users` – List; click through to `/users/:id`
- `/products` – `useSearchParams` for filters
- `/login` – Fake login (writes to localStorage)
- `/dashboard/*` – **Protected** nested routes using `<Outlet>`
  - `/dashboard/profile`
  - `/dashboard/settings`
  - `/dashboard/reports`
- `*` – 404 fallback

## 🧩 Concepts & Snippets

### Basic Routes

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### Nested Routes + Layout

```tsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Navigate to="profile" replace />} />
  <Route path="profile" element={<Profile />} />
</Route>
```

### Dynamic Params

```tsx
;<Route path="/users/:id" element={<UserDetail />} />
// in component:
const { id } = useParams()
```

### Search Params

```tsx
const [params, setParams] = useSearchParams()
setParams({ q: 'mouse', category: 'accessories' })
```

### Protected Routes

```tsx
export default function RequireAuth({ children }: { children: React.ReactElement }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}
```

### Lazy Loading

```tsx
const About = React.lazy(() => import('./pages/About'))
<Suspense fallback={<Spinner/>}><About/></Suspense>
```

## ✅ Why Use React Router

- Declarative, component-first routing that fits React’s mental model.
- Persistent layouts via nested routes and `<Outlet/>`.
- Fine control over navigation state, params, and history.
- Rich ecosystem and community.

## ⚠️ When Not To Use / Drawbacks

- **SSR/SSG-first apps**: Consider Next.js/Remix with file-based routing.
- **Simple multi-page sites**: Traditional multi-page routing or static generators may be simpler.
- **SEO-critical** content with minimal hydration: SSR/SSG often yields better crawlability.
- Requires **SPA fallback** for deep links with BrowserRouter.
- Deeply nested trees can become complex—prefer route modules/configs for organization.

## 🧪 Hands-On Tasks

1. Add a new route: `/faq` (static page).
2. Create a nested group under `/dashboard/billing` with `invoices` and `plans`.
3. Persist a search state to the URL in `/products`.
4. Add role-based authorization (e.g., admin-only `/dashboard/reports`).
5. Switch to **HashRouter** and observe URL changes.

## 🔁 HashRouter vs BrowserRouter

- **BrowserRouter** (default here): Clean URLs. Requires server rewrites for deep links.
- **HashRouter**: Works on static hosts without rewrites but shows `#/` in URL.
  Use HashRouter for GitHub Pages, prototypes, or when server control is limited.

## ♿ Accessibility Tips

- Use proper headings and link text.
- Manage focus on route changes for screen readers.
- Provide loading states for `<Suspense>` boundaries.

## 🧠 Pro Tips & Best Practices

- Keep your route tree near the UI it renders (co-locate when helpful).
- Split routes with `React.lazy` at page boundaries.
- Use **search params** to encode filter/sort state (shareable URLs).
- Always add a `*` catch-all route for 404s.
- Avoid prop-drilling auth—use context or state libraries.

---

Happy routing! If you want me to extend this with data loaders, error boundaries, or route objects API, say the word.
