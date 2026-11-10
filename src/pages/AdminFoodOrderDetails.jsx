import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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

const getErrorMessage = async (error) => {
  const response = error?.context
  if (typeof response?.clone === 'function') {
    try {
      const body = await response.clone().json()
      if (typeof body?.error === 'string') return body.error
    } catch {
      // Fall back to the function error when the response has no JSON body.
    }
  }
  return error instanceof Error ? error.message : 'An unexpected error occurred.'
}

const orderStatuses = [
  ['placed', 'Placed'],
  ['confirmed', 'Confirmed'],
  ['assigned', 'Assigned'],
  ['preparing', 'Preparing'],
  ['ready', 'Ready'],
  ['out_for_delivery', 'Out for delivery'],
  ['delivered', 'Delivered'],
  ['cancelled', 'Cancelled'],
]

const getFoodName = (item, index) =>
  item?.product_name || item?.food_name || item?.name || item?.title || `Item ${index + 1}`

const getAddressLabel = (address) => {
  if (!address || typeof address !== 'object') return '—'
  if (typeof address.formatted_address === 'string' && address.formatted_address.trim()) {
    return address.formatted_address.trim()
  }

  const parts = [
    address.house_number || address.address_line1 || address.address_line || address.addressLine || address.line1,
    address.street || address.address_line2 || address.locality,
    address.landmark ? `Near ${address.landmark}` : '',
    address.city,
    address.state,
    address.pincode || address.postal_code,
  ].filter(Boolean)

  return parts.join(', ') || 'Address not provided'
}

export default function AdminFoodOrderDetails() {
  useSEO({
    title: 'Food Order Details - Awadh Info Solution',
    description: 'View detailed food order details in the admin dashboard.',
  })

  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [deliveryPartners, setDeliveryPartners] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedPartner, setSelectedPartner] = useState('')
  const [deliveryPin, setDeliveryPin] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    if (!localStorage.getItem('admin_user')) {
      navigate('/login')
      return
    }

    const fetchOrder = async () => {
      try {
        setLoading(true)
        setError('')
        const adminSession = JSON.parse(localStorage.getItem('admin_user') || '{}')
        if (!adminSession.session_token) {
          localStorage.removeItem('admin_user')
          navigate('/login')
          return
        }

        const headers = { 'x-website-admin-token': adminSession.session_token }
        const [orderResponse, partnerResponse] = await Promise.all([
          supabase.functions.invoke('fetch-website-food-orders', {
            body: { action: 'list', order_id: id },
            headers,
          }),
          supabase.functions.invoke('fetch-website-food-orders', {
            body: { action: 'list_delivery_partners' },
            headers,
          }),
        ])

        if (orderResponse.error) throw orderResponse.error
        if (partnerResponse.error) throw partnerResponse.error
        if (!Array.isArray(orderResponse.data) || !Array.isArray(partnerResponse.data)) {
          throw new Error('Food order details returned an unexpected response.')
        }
        const matchingOrder = orderResponse.data.find((foodOrder) => foodOrder.id === id) || null
        setOrder(matchingOrder)
        setSelectedStatus(
          String(matchingOrder?.order_status || 'placed')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '_'),
        )
        setSelectedPartner(matchingOrder?.delivery_partner_id || '')
        setDeliveryPartners(partnerResponse.data)
        if (!matchingOrder) setError('Food order not found.')
      } catch (err) {
        console.error('Food order detail fetch error:', err)
        setError('Failed to load the food order details.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id, navigate])

  const orderItems = useMemo(() => Array.isArray(order?.items) ? order.items : [], [order])
  const customerAddress = order?.address_snapshot || {}

  const saveOrderChanges = async (event) => {
    event.preventDefault()
    setSaving(true)
    setSaveMessage('')
    setSaveError('')

    try {
      const currentStatus = String(order.order_status || 'placed')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_')
      const currentPartner = order.delivery_partner_id || ''
      const partnerChanged = selectedPartner !== currentPartner
      const statusChanged = selectedStatus !== currentStatus
      const nextStatus = statusChanged
        ? selectedStatus
        : partnerChanged && selectedPartner
          ? 'assigned'
          : null

      const needsDeliveryPin = nextStatus === 'delivered' && currentStatus !== 'delivered'
      if (needsDeliveryPin && !/^\d{4}$/.test(deliveryPin)) {
        setSaveError('Enter the 4-digit delivery PIN.')
        return
      }

      if (!partnerChanged && !nextStatus) {
        setSaveMessage('No changes to save.')
        return
      }

      const adminSession = JSON.parse(localStorage.getItem('admin_user') || '{}')
      if (!adminSession.session_token) {
        localStorage.removeItem('admin_user')
        navigate('/login')
        return
      }

      const { data, error: updateError } = await supabase.functions.invoke(
        'fetch-website-food-orders',
        {
          body: {
            action: 'update_order',
            order_id: id,
            ...(nextStatus ? { order_status: nextStatus } : {}),
            ...(partnerChanged ? { delivery_partner_id: selectedPartner || null } : {}),
            ...(needsDeliveryPin ? { delivery_pin: deliveryPin } : {}),
          },
          headers: { 'x-website-admin-token': adminSession.session_token },
        },
      )
      if (updateError) throw updateError
      if (!data?.order) throw new Error('Updated order was not returned.')

      setOrder(data.order)
      setSelectedStatus(
        String(data.order.order_status || 'placed')
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '_'),
      )
      setSelectedPartner(data.order.delivery_partner_id || '')
      setDeliveryPin('')
      setSaveMessage('Order changes saved.')
    } catch (err) {
      console.error('Food order update error:', err)
      setSaveError(await getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-app-bg px-4 py-8 text-app-body md:px-6">
        <div className="mx-auto max-w-5xl rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500 shadow-sm">
          Loading order details...
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-app-bg px-4 py-8 text-app-body md:px-6">
        <div className="mx-auto max-w-5xl rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
          <p className="font-semibold">Unable to load order</p>
          <p className="mt-2">{error || 'This order could not be found.'}</p>
          <Link to="/admin/food/orders" className="mt-4 inline-block text-sm font-semibold text-orange-600 hover:underline">
            &larr; Back to food orders
          </Link>
        </div>
      </div>
    )
  }

  const status = String(order.order_status || 'placed').replace(/_/g, ' ')

  return (
    <div className="min-h-screen bg-app-bg px-4 py-8 text-app-body md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/admin/food/orders" className="text-sm font-semibold text-orange-600 hover:underline">&larr; Back to food orders</Link>
            <h1 className="mt-2 text-3xl font-bold text-app-header">Order Details</h1>
          </div>
          <span className="inline-flex rounded-full bg-orange-100 px-3 py-1.5 text-sm font-semibold capitalize text-orange-700">
            {status}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2 border-b border-gray-200 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <h2 className="text-2xl font-bold text-app-header">{order.order_number || order.id.slice(0, 8)}</h2>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Placed</p>
                  <p className="font-medium text-gray-700">{formatDate(order.placed_at)}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="mt-1 text-lg font-semibold text-app-header">{order.user_id || 'Unknown user'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Restaurant</p>
                  <p className="mt-1 text-lg font-semibold text-app-header">{order.restaurant_name || order.restaurant_id || 'Unknown restaurant'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="mt-1 font-medium text-gray-700">{order.payment_method || 'COD'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <p className="mt-1 font-medium text-gray-700">{order.payment_status || 'pending'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="mt-1 font-medium text-gray-700">
                    {getAddressLabel(customerAddress)}
                  </p>
                  {customerAddress.full_name && (
                    <p className="mt-1 text-sm text-gray-500">{customerAddress.full_name}</p>
                  )}
                  {customerAddress.phone && (
                    <p className="text-sm text-gray-500">{customerAddress.phone}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Delivered At</p>
                  <p className="mt-1 font-medium text-gray-700">{formatDate(order.delivered_at)}</p>
                  <p className="mt-3 text-sm text-gray-500">Delivery PIN</p>
                  <p className="mt-1 font-medium text-gray-700">
                    {order.delivery_pin == null || order.delivery_pin === ''
                      ? '—'
                      : String(order.delivery_pin)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-app-header">Order Items</h3>
              <div className="mt-5 space-y-3">
                {orderItems.length === 0 ? (
                  <p className="text-gray-500">No items available.</p>
                ) : (
                  orderItems.map((item, index) => (
                    <div key={`${item.name || 'item'}-${index}`} className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-3">
                      <div>
                        <p className="font-semibold text-gray-800">{getFoodName(item, index)}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity || item.qty || 1}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(item.total_price || item.price || 0)}</p>
                        <p className="text-xs text-gray-500">{item.unit_price ? `@ ${formatCurrency(item.unit_price)}` : ''}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <form onSubmit={saveOrderChanges} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-app-header">Manage Order</h3>
              {saveMessage && <p role="status" className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-700">{saveMessage}</p>}
              {saveError && <p role="alert" className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{saveError}</p>}
              <label className="mt-4 block text-sm font-medium text-gray-700">
                Order Status
                <select
                  value={selectedStatus}
                  onChange={(event) => {
                    setSelectedStatus(event.target.value)
                    setDeliveryPin('')
                  }}
                  disabled={order.order_status === 'delivered'}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                >
                  {orderStatuses.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
              {order.order_status === 'delivered' && (
                <p className="mt-2 text-sm text-gray-500">
                  Delivered orders can no longer have their status or delivery partner changed.
                </p>
              )}
              {selectedStatus === 'delivered' && order.order_status !== 'delivered' && (
                <label className="mt-4 block text-sm font-medium text-gray-700">
                  Delivery PIN
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{4}"
                    maxLength={4}
                    value={deliveryPin}
                    onChange={(event) => setDeliveryPin(event.target.value.replace(/\D/g, ''))}
                    required
                    placeholder="Enter 4-digit PIN"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </label>
              )}
              <label className="mt-4 block text-sm font-medium text-gray-700">
                Delivery Partner
                <select
                  value={selectedPartner}
                  onChange={(event) => setSelectedPartner(event.target.value)}
                  disabled={order.order_status === 'delivered'}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                >
                  <option value="">Unassigned</option>
                  {deliveryPartners.map((partner) => (
                    <option key={partner.id} value={partner.id}>
                      {partner.name}{partner.phone ? ` (${partner.phone})` : ''}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                disabled={saving}
                className="mt-5 w-full rounded-md bg-orange-600 px-4 py-2 font-semibold text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-app-header">Summary</h3>
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(order.subtotal)}</span></div>
                <div className="flex justify-between"><span>Discount</span><span>- {formatCurrency(order.discount)}</span></div>
                <div className="flex justify-between"><span>Delivery Fee</span><span>{formatCurrency(order.delivery_fee)}</span></div>
                <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(order.tax)}</span></div>
                <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-semibold text-gray-900"><span>Total</span><span>{formatCurrency(order.total_amount)}</span></div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  )
}
