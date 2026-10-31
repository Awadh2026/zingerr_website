import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO.jsx'

const quickModules = [
  {
    title: 'Orders',
    description: 'Track collection totals, order status, and delivery partners.',
    to: '/admin/orders',
  },
  {
    title: 'Products',
    description: 'Create and manage quick-commerce products.',
    to: '/admin/products',
  },
  {
    title: 'Categories',
    description: 'Control product categories and their availability.',
    to: '/admin/categories',
  },
  {
    title: 'Offers',
    description: 'Manage discounts and promotional offers.',
    to: '/admin/offers',
  },
  {
    title: 'Profiles',
    description: 'View and manage customer and staff profiles.',
    to: '/admin/profiles',
  },
]

export default function AdminDashboard() {
  useSEO({
    title: 'Admin Dashboard - Awadh Info Solution',
    description: 'Choose Quick or Food management from the Zingerr admin dashboard.',
  })

  const navigate = useNavigate()
  const { section } = useParams()

  if (!localStorage.getItem('admin_user')) {
    return <Navigate to="/login" replace />
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_user')
    navigate('/login')
  }

  if (!section) {
    return (
      <div className="min-h-screen bg-app-bg px-4 py-8 text-app-body md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between gap-4">
            <img src="/favicon.svg" alt="Zingerr" className="h-10 w-10 rounded-full bg-white p-1" />
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          <div className="mt-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-app-accent">Admin Dashboard</p>
            <h1 className="mt-3 text-3xl font-bold text-app-header md:text-4xl">Choose a service</h1>
            <p className="mt-3 text-gray-600">Select the area you want to manage.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Link
              to="/admin/quick"
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-app-accent hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-app-accent text-2xl text-white">Q</div>
              <h2 className="mt-6 text-2xl font-bold text-app-header">Quick</h2>
              <p className="mt-2 text-gray-600">Orders, products, categories, offers, and profiles.</p>
              <span className="mt-6 inline-flex font-semibold text-app-accent">Open Quick &rarr;</span>
            </Link>

            <Link
              to="/admin/food"
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-app-accent hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500 text-2xl text-white">F</div>
              <h2 className="mt-6 text-2xl font-bold text-app-header">Food</h2>
              <p className="mt-2 text-gray-600">Food-service management tools.</p>
              <span className="mt-6 inline-flex font-semibold text-orange-600">Open Food &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (section === 'quick') {
    return (
      <div className="min-h-screen bg-app-bg px-4 py-8 text-app-body md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <Link to="/admin" className="text-sm font-semibold text-app-accent hover:underline">&larr; All services</Link>
              <h1 className="mt-2 text-3xl font-bold text-app-header md:text-4xl">Quick Dashboard</h1>
            </div>
            <button type="button" onClick={handleLogout} className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">
              Logout
            </button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {quickModules.map((module) => (
              <Link
                key={module.title}
                to={module.to}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-app-accent hover:shadow-md"
              >
                <h2 className="text-xl font-bold text-app-header">{module.title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">{module.description}</p>
                <span className="mt-5 inline-flex font-semibold text-app-accent">Manage {module.title} &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (section === 'food') {
    return (
      <div className="min-h-screen bg-app-bg px-4 py-8 text-app-body md:px-6">
        <div className="mx-auto max-w-7xl">
          <Link to="/admin" className="text-sm font-semibold text-app-accent hover:underline">&larr; All services</Link>
          <h1 className="mt-2 text-3xl font-bold text-app-header md:text-4xl">Food Dashboard</h1>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/admin/food/business-profiles"
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-orange-500 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500 text-xl font-bold text-white">BP</div>
              <h2 className="mt-5 text-xl font-bold text-app-header">Business Profiles</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">Manage food business owners and their profile details.</p>
              <span className="mt-5 inline-flex font-semibold text-orange-600">Manage Profiles &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <Navigate to="/admin" replace />
}
