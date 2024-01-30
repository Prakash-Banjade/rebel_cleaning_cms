import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/ui/layout/Layout"
import LoginPage from "./pages/login/login-page"
import UsersPage from "./pages/cms/users/users.index"
import ServicesPage from "./pages/cms/services/services.index"
import BlogsPage from "./pages/cms/blogs/blogs.index"
import GalleryPage from "./pages/cms/gallery/gallery.index"


const routes = [
  { path: '/dashboard', element: <h1>Dashboard</h1> },
  { path: '/users', element: <UsersPage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/blogs', element: <BlogsPage /> },
  { path: '/gallery', element: <GalleryPage /> },
]

function App() {

  return (
    <Suspense fallback={<h3 className="text-4xl p-3">Loading...</h3>}>
      <Routes>
        {/* public route */}
        <Route path="/" element={<LoginPage />} />

        {/* private routes */}
        <Route element={<Layout />}>
          {
            routes.map((route, index) => <Route key={index} path={route.path} element={route.element} />)
          }
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
