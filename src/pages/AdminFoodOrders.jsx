import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useSEO } from '../hooks/useSEO.jsx'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(value || 0))

const formatDate = (value) => {
  if (!value) return '—'
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? String(value) : parsed.toLocaleString('en-IN')
}

const getOrderItemsCount = (items) => {
  if (!Array.isArray(items)) return 0
  return items.reduce((total, item) => {
    const qty = Number(item?.quantity || item?.qty || 1)
    return total + (Number.isFinite(qty) ? qty : 0)
  }, 0)
}

const getFoodItemsLabel = (items) => {
  if (!Array.isArray(items) || items.length === 0) return '—'
  return items.map((item) => {
    const name = item?.product_name || item?.food_name || item?.name || item?.title || 'Food item'
    const quantity = Number(item?.quantity || item?.qty || 1)
    return `${name} × ${Number.isFinite(quantity) ? quantity : 1}`
  }).join(', ')
}

const statusClasses = {
  placed: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-yellow-100 text-yellow-700',
  preparing: 'bg-orange-100 text-orange-700',
  ready: 'bg-purple-100 text-purple-700',
  out_for_delivery: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function AdminFoodOrders() {
  useSEO({
    title: 'Food Orders - Awadh Info Solution',
    description: 'View and manage food orders in the Zingerr admin dashboard.',
  })

  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('admin_user')) {
      navigate('/login')
      return
    }

    const fetchOrders = async () => {
      try {
        setLoading(true)
        setError('')
        const adminSession = JSON.parse(localStorage.getItem('admin_user') || '{}')
        if (!adminSession.session_token) {
          localStorage.removeItem('admin_user')
          navigate('/login')
          return
        }

        const { data, error: fetchError } = await supabase.functions.invoke(
          'fetch-website-food-orders',
          {
            body: { action: 'list' },
            headers: { 'x-website-admin-token': adminSession.session_token },
          },
        )

        if (fetchError) throw fetchError
        if (!Array.isArray(data)) {
          throw new Error('Website food orders returned an unexpected response.')
        }
        setOrders(data)
      } catch (err) {
        console.error('Food orders fetch error:', err)
        setError('Failed to load food orders.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [navigate])

  const totalSales = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0),
    [orders],
  )

  return (
    <div className="min-h-screen bg-app-bg px-4 py-8 text-app-body md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/admin/food" className="text-sm font-semibold text-orange-600 hover:underline">&larr; Food Dashboard</Link>
            <h1 className="mt-2 text-3xl font-bold text-app-header md:text-4xl">Food Orders</h1>
          </div>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('admin_user')
              navigate('/login')
            }}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-gray-500">Total Orders</div>
            <div className="mt-2 text-3xl font-bold text-app-header">{orders.length}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-gray-500">Total Sales</div>
            <div className="mt-2 text-3xl font-bold text-green-700">{formatCurrency(totalSales)}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-gray-500">Orders Pending</div>
            <div className="mt-2 text-3xl font-bold text-orange-700">
              {orders.filter((order) => String(order.order_status || '').toLowerCase() !== 'delivered').length}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">{error}</div>
        )}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">Restaurant</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">Food Items</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">Placed At</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-10 text-center text-gray-500">Loading food orders...</td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-10 text-center text-gray-500">No food orders found.</td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const status = String(order.order_status || 'placed').replace(/_/g, ' ')
                    const chips = statusClasses[order.order_status || 'placed'] || 'bg-gray-100 text-gray-700'

                    return (
                      <tr
                        key={order.id}
                        className="cursor-pointer transition hover:bg-orange-50/60"
                        onClick={() => navigate(`/admin/food/orders/${order.id}`)}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-app-header">{order.order_number || order.id.slice(0, 8)}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.user_id || '—'}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{order.restaurant_name || order.restaurant_id || '—'}</td>
                        <td className="max-w-sm px-4 py-3 text-sm text-gray-700">{getFoodItemsLabel(order.items)} <span className="text-gray-500">({getOrderItemsCount(order.items)} items)</span></td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">{formatCurrency(order.total_amount)}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${chips}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{formatDate(order.placed_at)}</td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation()
                              navigate(`/admin/food/orders/${order.id}`)
                            }}
                            className="rounded-md border border-orange-300 bg-orange-50 px-3 py-1.5 font-medium text-orange-700 hover:bg-orange-100"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
