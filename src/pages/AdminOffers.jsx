import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useSEO } from '../hooks/useSEO.jsx'
import { getCached, invalidateCache } from '../utils/apiCache'

const OFFERS_CACHE_KEY = 'offers'
const emptyForm = {
  offer_name: '',
  description: '',
  discount_amt: '',
  url: '',
  image: '',
  offer_type: 'PUJA',
  is_active: true
}

export default function AdminOffers() {
  useSEO({
    title: 'Admin Offers - Awadh Info Solution',
    description: 'Manage offer messages, links, and images on the Awadh Info Solution admin dashboard.',
    keywords: 'admin dashboard, offers, offer management',
    url: 'https://www.awadhinfosolution.in/#/admin/offers'
  })

  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('admin_user')) {
      navigate('/login')
      return
    }

    fetchOffers()
  }, [navigate])

  const fetchOffers = async () => {
    try {
      setLoading(true)
      const data = await getCached(OFFERS_CACHE_KEY, async () => {
        const { data: offerData, error: fetchError } = await supabase
          .from('offers')
          .select('*')
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError
        return offerData || []
      })

      setOffers(data)
      setError('')
    } catch (err) {
      console.error('Offers fetch error:', err)
      setError('Failed to load offers. Confirm that the offers table exists and is accessible.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)

    try {
      const payload = {
        offer_name: formData.offer_name.trim() || null,
        description: formData.description.trim() || null,
        discount_amt: formData.discount_amt === '' ? null : Number(formData.discount_amt),
        url: formData.url.trim() || null,
        image: formData.image.trim() || null,
        offer_type: formData.offer_type,
        is_active: formData.is_active
      }

      const query = editingId
        ? supabase.from('offers').update(payload).eq('id', editingId)
        : supabase.from('offers').insert([payload])
      const { error: saveError } = await query

      if (saveError) throw saveError

      invalidateCache(OFFERS_CACHE_KEY)
      setFormData(emptyForm)
      setEditingId(null)
      setShowForm(false)
      await fetchOffers()
    } catch (err) {
      console.error('Offer save error:', err)
      setError('Failed to save offer')
    } finally {
      setSaving(false)
    }
  }

  const startEditing = (offer) => {
    setFormData({
      offer_name: offer.offer_name || '',
      description: offer.description || '',
      discount_amt: offer.discount_amt ?? '',
      url: offer.url || '',
      image: offer.image || '',
      offer_type: offer.offer_type || 'PUJA',
      is_active: offer.is_active === true
    })
    setEditingId(offer.id)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData(emptyForm)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_user')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-app-bg text-app-body p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-app-header">Offers</h1>
            <p className="text-gray-600 mt-1">Manage offer messages, links, and images.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => navigate('/admin/categories')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Categories</button>
            <button onClick={() => navigate('/admin/products')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Products</button>
            <button onClick={() => navigate('/admin/profiles')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Profiles</button>
            <button onClick={() => navigate('/admin/orders')} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Orders</button>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
          </div>
        </div>

        {error && <div className="mb-4 p-3 rounded-md border border-red-200 bg-red-50 text-red-700">{error}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-app-header">{editingId ? 'Edit Offer' : 'Add Offer'}</h2>
              <button type="button" onClick={closeForm} className="text-sm text-gray-500 hover:text-gray-700">Close</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="text-sm font-medium text-gray-700">Offer name
                <input value={formData.offer_name} onChange={(event) => setFormData({ ...formData, offer_name: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
              <label className="text-sm font-medium text-gray-700">Offer type
                <select value={formData.offer_type} onChange={(event) => setFormData({ ...formData, offer_type: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white">
                  <option value="PUJA">Puja</option>
                  <option value="SALE">Sale</option>
                  <option value="FESTIVAL">Festival</option>
                </select>
              </label>
              <label className="text-sm font-medium text-gray-700">Discount percent
                <input type="number" min="0" max="100" step="1" value={formData.discount_amt} onChange={(event) => setFormData({ ...formData, discount_amt: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
              <label className="text-sm font-medium text-gray-700 md:col-span-2">Offer message
                <textarea value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} rows="3" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
              <label className="text-sm font-medium text-gray-700">Destination URL
                <input type="text" value={formData.url} onChange={(event) => setFormData({ ...formData, url: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
              <label className="text-sm font-medium text-gray-700">Image URL
                <input type="text" value={formData.image} onChange={(event) => setFormData({ ...formData, image: event.target.value })} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
              </label>
            </div>
            {formData.image && (
              <img src={formData.image} alt="Offer preview" className="mt-4 h-28 w-48 rounded-md border border-gray-200 object-cover" />
            )}
            <label className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={formData.is_active} onChange={(event) => setFormData({ ...formData, is_active: event.target.checked })} className="h-4 w-4" />
              Active
            </label>
            <div className="mt-4 flex justify-end">
              <button type="submit" disabled={saving} className="px-5 py-2 bg-app-accent text-white rounded-md hover:bg-opacity-90 disabled:opacity-50">
                {saving ? 'Saving...' : editingId ? 'Update Offer' : 'Save Offer'}
              </button>
            </div>
          </form>
        )}

        <div className="mb-4 flex justify-end">
          <button onClick={() => { setFormData(emptyForm); setEditingId(null); setShowForm(true) }} className="px-4 py-2 bg-app-accent text-white rounded-md hover:bg-opacity-90">
            + Add Offer
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Image</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Offer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Message</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Discount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="7" className="px-4 py-10 text-center text-gray-500">Loading offers...</td></tr>
                ) : offers.length === 0 ? (
                  <tr><td colSpan="7" className="px-4 py-10 text-center text-gray-500">No offers found</td></tr>
                ) : offers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {offer.image ? <img src={offer.image} alt={offer.offer_name || 'Offer'} className="h-12 w-16 rounded-md object-cover" /> : <div className="h-12 w-16 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-500">No img</div>}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{offer.offer_name || 'Unnamed offer'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700"><div className="max-w-sm whitespace-pre-wrap">{offer.description || '—'}</div></td>
                    <td className="px-4 py-3 text-sm text-gray-700">{offer.discount_amt === null || offer.discount_amt === undefined ? '—' : `${offer.discount_amt}%`}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{offer.offer_type}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{offer.is_active ? 'Active' : 'Inactive'}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => startEditing(offer)} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}