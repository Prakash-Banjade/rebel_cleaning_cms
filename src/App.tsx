import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/ui/layout/Layout"
import LoginPage from "./pages/login/login-page"
import UsersPage from "./pages/cms/users/users.index"
import ServicesPage from "./pages/cms/services/services.index"
import BlogsPage from "./pages/cms/blogs/blogs.index"
import GalleryPage from "./pages/cms/gallery/gallery.index"
import AddService from "./pages/cms/services/add-service"
import SingleServiceView from "./pages/cms/services/single-service-view"
import EditService from "./pages/cms/services/edit-service"
import SingleBlogView from "./pages/cms/blogs/single-blog-view"


const routes = [
  { path: '/dashboard', element: <h1>Dashboard</h1> },
  { path: '/users', element: <UsersPage /> },
  { path: '/users/new', element: <h1>Add new user</h1> },

  { path: '/services', element: <ServicesPage /> },
  { path: '/services/new', element: <AddService /> },
  { path: '/services/:id', element: <SingleServiceView /> },
  { path: '/services/:id/edit', element: <EditService /> },

  { path: '/blogs', element: <BlogsPage /> },
  { path: '/blogs/new', element: <h1>Add new blog</h1> },
  { path: '/blogs/:id', element: <SingleBlogView /> },

  { path: '/gallery', element: <GalleryPage /> },
  { path: '/gallery/new', element: <h1>Add new gallery</h1> },
  { path: '/gallery/:id', element: <h1>This is single gallery</h1> },
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
