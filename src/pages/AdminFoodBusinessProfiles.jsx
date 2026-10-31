import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useSEO } from '../hooks/useSEO.jsx'
import { encodeRouteId } from '../utils/routeId'

const emptyForm = {
  id: '',
  business_id: '',
  mobile_number: '',
  role: '',
  fcm_token: '',
  is_verified: false,
}

export default function AdminFoodBusinessProfiles() {
  useSEO({
    title: 'Food Business Profiles - Awadh Info Solution',
    description: 'Manage Food business profiles in the Zingerr admin dashboard.',
  })

  const navigate = useNavigate()
  const [profiles, setProfiles] = useState([])
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchProfiles = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('business_profile')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setProfiles(data || [])
      setError('')
    } catch (err) {
      console.error('Food business profile fetch error:', err)
      setError('Failed to load business profiles.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('admin_user')) {
      navigate('/login')
      return
    }
    fetchProfiles()
  }, [navigate])

  const startCreating = () => {
    setEditingId(null)
    setFormData({ ...emptyForm, id: crypto.randomUUID() })
    setShowForm(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      const payload = {
        business_id: formData.business_id.trim() || null,
        mobile_number: formData.mobile_number.trim(),
        role: formData.role.trim(),
        fcm_token: formData.fcm_token.trim() || null,
        is_verified: formData.is_verified,
        updated_at: new Date().toISOString(),
      }

      const query = editingId
        ? supabase.from('business_profile').update(payload).eq('id', editingId)
        : supabase.from('business_profile').insert([{ ...payload, id: formData.id.trim() }])
      const { error: saveError } = await query

      if (saveError) throw saveError

      setShowForm(false)
      setEditingId(null)
      setFormData(emptyForm)
      await fetchProfiles()
    } catch (err) {
      console.error('Food business profile save error:', err)
      setError(err.code === '23505' ? 'That profile ID already exists.' : 'Failed to save business profile.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (profile) => {
    if (!window.confirm(`Delete business profile ${profile.id}?`)) return

    try {
      const { error: deleteError } = await supabase
        .from('business_profile')
        .delete()
        .eq('id', profile.id)

      if (deleteError) throw deleteError
      await fetchProfiles()
    } catch (err) {
      console.error('Food business profile delete error:', err)
      setError('Failed to delete business profile.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_user')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-app-bg p-4 text-app-body md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-orange-600">Food</p>
            <h1 className="text-3xl font-bold text-app-header md:text-4xl">Business Profiles</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/admin" className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">Home</Link>
            <Link to="/admin/food" className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">Food</Link>
            <button type="button" onClick={startCreating} className="rounded-md bg-app-accent px-4 py-2 text-white hover:bg-opacity-90">Add Profile</button>
            <button type="button" onClick={handleLogout} className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">Logout</button>
          </div>
        </div>

        {error && <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">{error}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-app-header">{editingId ? 'Edit Business Profile' : 'Add Business Profile'}</h2>
              <button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-500 hover:text-gray-700">Close</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <label className="text-sm font-medium text-gray-700">Profile ID
                <input required disabled={Boolean(editingId)} value={formData.id} onChange={(event) => setFormData({ ...formData, id: event.target.value })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100" />
              </label>
              <label className="text-sm font-medium text-gray-700">Business ID
                <input value={formData.business_id} onChange={(event) => setFormData({ ...formData, business_id: event.target.value })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
              </label>
              <label className="text-sm font-medium text-gray-700">Mobile Number
                <input required value={formData.mobile_number} onChange={(event) => setFormData({ ...formData, mobile_number: event.target.value })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
              </label>
              <label className="text-sm font-medium text-gray-700">Role
                <input required value={formData.role} onChange={(event) => setFormData({ ...formData, role: event.target.value })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
              </label>
              <label className="text-sm font-medium text-gray-700 md:col-span-2">FCM Token
                <input value={formData.fcm_token} onChange={(event) => setFormData({ ...formData, fcm_token: event.target.value })} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2" />
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input type="checkbox" checked={formData.is_verified} onChange={(event) => setFormData({ ...formData, is_verified: event.target.checked })} />
                Verified
              </label>
            </div>
            <button type="submit" disabled={saving} className="mt-5 rounded-md bg-app-accent px-5 py-2 font-medium text-white disabled:opacity-50">
              {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Profile'}
            </button>
          </form>
        )}

        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Business ID', 'Mobile', 'Role', 'Verified', 'Updated', 'Actions'].map((heading) => (
                  <th key={heading} className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="7" className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
              ) : profiles.length === 0 ? (
                <tr><td colSpan="7" className="px-4 py-8 text-center text-gray-500">No business profiles found.</td></tr>
              ) : profiles.map((profile) => (
                <tr key={profile.id}>
                  <td className="max-w-48 truncate px-4 py-3 font-mono text-xs">{profile.id}</td>
                  <td className="px-4 py-3">{profile.business_id || '—'}</td>
                  <td className="px-4 py-3">{profile.mobile_number}</td>
                  <td className="px-4 py-3">{profile.role}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${profile.is_verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {profile.is_verified ? 'Verified' : 'Not verified'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                    {profile.updated_at ? new Date(profile.updated_at).toLocaleString('en-IN') : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/food/restaurants/${encodeRouteId(profile.id)}`)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDelete(profile)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
