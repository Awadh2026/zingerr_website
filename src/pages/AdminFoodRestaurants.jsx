import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase/client'
import { useSEO } from '../hooks/useSEO.jsx'
import { decodeRouteId } from '../utils/routeId'

const emptyRestaurant = {
  owner_id: '',
  name: '',
  address: '',
  city: '',
  pincode: '',
  phone: '',
  email: '',
  description: '',
  cuisine_types: '',
  image_url: '',
  cover_image_url: '',
  latitude: '',
  longitude: '',
  opening_time: '',
  closing_time: '',
  delivery_fee: 0,
  commision: 0,
  minimum_order_amount: 0,
  estimated_delivery_time: 20,
  is_active: true,
  is_open: false,
  status: '',
  fssai_document: '',
}

const emptyProfile = {
  id: '',
  business_id: '',
  mobile_number: '',
  role: '',
  fcm_token: '',
  is_verified: false,
}

const emptyBankDetails = {
  account_holder_name: '',
  account_number: '',
  account_type: '',
  bank_name: '',
  branch_name: '',
  ifsc_code: '',
}

export default function AdminFoodRestaurants() {
  useSEO({
    title: 'Food Restaurants - Awadh Info Solution',
    description: 'Manage restaurants owned by Food business profiles.',
  })

  const { ownerId: routeOwnerId } = useParams()
  const ownerId = decodeRouteId(routeOwnerId)
  const navigate = useNavigate()
  const [formData, setFormData] = useState(emptyRestaurant)
  const [restaurantId, setRestaurantId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [activeSection, setActiveSection] = useState('basic')
  const [activeMainSection, setActiveMainSection] = useState('profile')
  const [profileData, setProfileData] = useState(emptyProfile)
  const [bankData, setBankData] = useState(emptyBankDetails)

  useEffect(() => {
    if (!localStorage.getItem('admin_user')) {
      navigate('/login')
      return
    }

    const fetchRestaurant = async () => {
      if (!ownerId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')
        const { data: profile, error: profileError } = await supabase
          .from('business_profile')
          .select('*')
          .eq('id', ownerId)
          .maybeSingle()

        if (profileError) throw profileError
        setProfileData(profile ? {
          id: profile.id,
          business_id: profile.business_id || '',
          mobile_number: profile.mobile_number || '',
          role: profile.role || '',
          fcm_token: profile.fcm_token || '',
          is_verified: profile.is_verified === true,
        } : { ...emptyProfile, id: ownerId })

        const { data, error: fetchError } = await supabase
          .from('restaurants')
          .select('*')
          .eq('owner_id', ownerId)
          .maybeSingle()

        if (fetchError) throw fetchError

        if (data) {
          setRestaurantId(data.id)
          setFormData({
            owner_id: data.owner_id || ownerId,
            name: data.name || '',
            address: data.address || '',
            city: data.city || '',
            pincode: data.pincode || '',
            phone: data.phone || '',
            email: data.email || '',
            description: data.description || '',
            cuisine_types: (data.cuisine_types || []).join(', '),
            image_url: data.image_url || '',
            cover_image_url: data.cover_image_url || '',
            latitude: data.latitude ?? '',
            longitude: data.longitude ?? '',
            opening_time: data.opening_time || '',
            closing_time: data.closing_time || '',
            delivery_fee: data.delivery_fee ?? 0,
            commision: data.commision ?? data.commission ?? 0,
            minimum_order_amount: data.minimum_order_amount ?? 0,
            estimated_delivery_time: data.estimated_delivery_time ?? 20,
            is_active: data.is_active !== false,
            is_open: data.is_open === true,
            status: data.status || '',
            fssai_document: data.fssai_document || data.fssai_document_url || data.fssai_license_url || data.fssai_certificate_url || '',
          })
        } else {
          setRestaurantId(null)
          setFormData({ ...emptyRestaurant, owner_id: ownerId })
        }

        const { data: bankResponse, error: bankError } = await supabase.functions.invoke('bank-details', {
          body: { action: 'fetch' },
          headers: { 'x-business-id': ownerId },
        })
        if (bankError) throw bankError
        setBankData(bankResponse?.data ? {
          account_holder_name: bankResponse.data.account_holder_name || '',
          account_number: bankResponse.data.account_number || '',
          account_type: bankResponse.data.account_type || '',
          bank_name: bankResponse.data.bank_name || '',
          branch_name: bankResponse.data.branch_name || '',
          ifsc_code: bankResponse.data.ifsc_code || '',
        } : emptyBankDetails)
      } catch (err) {
        console.error('Restaurant fetch error:', err)
        setError('Failed to load the restaurant for this business profile.')
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurant()
  }, [navigate, ownerId])

  const setField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const saveProfile = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      const { error: saveError } = await supabase
        .from('business_profile')
        .update({
          business_id: profileData.business_id.trim() || null,
          mobile_number: profileData.mobile_number.trim(),
          role: profileData.role.trim(),
          fcm_token: profileData.fcm_token.trim() || null,
          is_verified: profileData.is_verified,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ownerId)

      if (saveError) throw saveError
      setActiveMainSection('restaurant')
    } catch (err) {
      console.error('Business profile save error:', err)
      setError('Failed to save the business profile.')
    } finally {
      setSaving(false)
    }
  }

  const saveBankDetails = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      const { error: saveError } = await supabase.functions.invoke('bank-details', {
        body: {
          action: 'save',
          details: {
            ...bankData,
            ifsc_code: bankData.ifsc_code.trim().toUpperCase(),
          },
        },
        headers: { 'x-business-id': ownerId },
      })

      if (saveError) throw saveError
      setActiveMainSection('restaurant')
    } catch (err) {
      console.error('Bank details save error:', err)
      setError('Failed to save the bank details.')
    } finally {
      setSaving(false)
    }
  }

  const saveRestaurant = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      const payload = {
        owner_id: formData.owner_id.trim(),
        name: formData.name.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
        phone: formData.phone.trim() || null,
        email: formData.email.trim() || null,
        description: formData.description.trim() || null,
        cuisine_types: formData.cuisine_types.split(',').map((item) => item.trim()).filter(Boolean),
        image_url: formData.image_url.trim() || null,
        cover_image_url: formData.cover_image_url.trim() || null,
        fssai_document: formData.fssai_document.trim() || null,
        latitude: formData.latitude === '' ? null : Number(formData.latitude),
        longitude: formData.longitude === '' ? null : Number(formData.longitude),
        opening_time: formData.opening_time || null,
        closing_time: formData.closing_time || null,
        delivery_fee: Number(formData.delivery_fee),
        commision: Number(formData.commision),
        minimum_order_amount: Number(formData.minimum_order_amount),
        estimated_delivery_time: Number(formData.estimated_delivery_time),
        is_active: formData.is_active,
        is_open: formData.is_open,
        status: formData.status.trim() || null,
        updated_at: new Date().toISOString(),
      }

      const query = restaurantId
        ? supabase.from('restaurants').update(payload).eq('id', restaurantId)
        : supabase.from('restaurants').insert([payload])
      const { error: saveError } = await query

      if (saveError) throw saveError
      navigate('/admin/food/business-profiles')
    } catch (err) {
      console.error('Restaurant save error:', err)
      setError('Failed to save the restaurant.')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'mt-1 w-full rounded-md border border-gray-300 px-3 py-2'
  const isDocumentUrl = /^https?:\/\/\S+$/i.test(formData.fssai_document || '')
  const encryptedDocument = formData.fssai_document && formData.fssai_document.length > 8
    ? `${formData.fssai_document.slice(0, 3)}••••••${formData.fssai_document.slice(-4)}`
    : formData.fssai_document
  const sections = [
    ['basic', 'Basic Details'],
    ['media', 'Images'],
    ['operations', 'Operations & Delivery'],
  ]

  return (
    <div className="min-h-screen bg-app-bg p-4 text-app-body md:p-6">
      <div className="mx-auto max-w-5xl">
        <Link to="/admin/food/business-profiles" className="text-sm font-semibold text-orange-600 hover:underline">&larr; Business Profiles</Link>
        <h1 className="mt-2 text-3xl font-bold text-app-header">Manage Food Business</h1>
        {ownerId && <p className="mt-1 break-all text-sm text-gray-500">Owner ID: {ownerId}</p>}

        {error && <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">{error}</div>}
        {loading ? (
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">Loading restaurant...</div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50" role="tablist" aria-label="Business sections">
              <button type="button" role="tab" aria-selected={activeMainSection === 'profile'} onClick={() => setActiveMainSection('profile')} className={`min-w-max px-6 py-4 text-sm font-semibold ${activeMainSection === 'profile' ? 'border-b-2 border-orange-600 text-orange-600' : 'border-b-2 border-transparent text-gray-600'}`}>
                Profile Section
              </button>
              <button type="button" role="tab" aria-selected={activeMainSection === 'restaurant'} onClick={() => setActiveMainSection('restaurant')} className={`min-w-max px-6 py-4 text-sm font-semibold ${activeMainSection === 'restaurant' ? 'border-b-2 border-orange-600 text-orange-600' : 'border-b-2 border-transparent text-gray-600'}`}>
                Restaurant Section
              </button>
              <button type="button" role="tab" aria-selected={activeMainSection === 'bank'} onClick={() => setActiveMainSection('bank')} className={`min-w-max px-6 py-4 text-sm font-semibold ${activeMainSection === 'bank' ? 'border-b-2 border-orange-600 text-orange-600' : 'border-b-2 border-transparent text-gray-600'}`}>
                Bank Section
              </button>
            </div>

            {activeMainSection === 'profile' && (
              <form onSubmit={saveProfile} className="grid gap-4 p-5 md:grid-cols-2">
                <label className="text-sm font-medium text-gray-700">Profile ID
                  <input readOnly value={profileData.id} className={`${inputClass} bg-gray-100`} />
                </label>
                <label className="text-sm font-medium text-gray-700">Business ID
                  <input value={profileData.business_id} onChange={(event) => setProfileData((current) => ({ ...current, business_id: event.target.value }))} className={inputClass} />
                </label>
                <label className="text-sm font-medium text-gray-700">Mobile Number
                  <input required value={profileData.mobile_number} onChange={(event) => setProfileData((current) => ({ ...current, mobile_number: event.target.value }))} className={inputClass} />
                </label>
                <label className="text-sm font-medium text-gray-700">Role
                  <input required value={profileData.role} onChange={(event) => setProfileData((current) => ({ ...current, role: event.target.value }))} className={inputClass} />
                </label>
                <label className="text-sm font-medium text-gray-700 md:col-span-2">FCM Token
                  <input value={profileData.fcm_token} onChange={(event) => setProfileData((current) => ({ ...current, fcm_token: event.target.value }))} className={inputClass} />
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input type="checkbox" checked={profileData.is_verified} onChange={(event) => setProfileData((current) => ({ ...current, is_verified: event.target.checked }))} /> Verified
                </label>
                <div className="md:col-span-2">
                  <button type="submit" disabled={saving} className="rounded-md bg-orange-600 px-5 py-2 font-medium text-white disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </form>
            )}
            {activeMainSection === 'bank' && (
              <form onSubmit={saveBankDetails} className="grid gap-4 p-5 md:grid-cols-2">
                <label className="text-sm font-medium text-gray-700 md:col-span-2">Account Holder Name
                  <input required value={bankData.account_holder_name} onChange={(event) => setBankData((current) => ({ ...current, account_holder_name: event.target.value }))} className={inputClass} />
                </label>
                <label className="text-sm font-medium text-gray-700">Account Number
                  <input required value={bankData.account_number} onChange={(event) => setBankData((current) => ({ ...current, account_number: event.target.value }))} className={inputClass} />
                </label>
                <label className="text-sm font-medium text-gray-700">Account Type
                  <select required value={bankData.account_type} onChange={(event) => setBankData((current) => ({ ...current, account_type: event.target.value }))} className={inputClass}>
                    <option value="">Select account type</option>
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                  </select>
                </label>
                <label className="text-sm font-medium text-gray-700">Bank Name
                  <input required value={bankData.bank_name} onChange={(event) => setBankData((current) => ({ ...current, bank_name: event.target.value }))} className={inputClass} />
                </label>
                <label className="text-sm font-medium text-gray-700">Branch Name
                  <input required value={bankData.branch_name} onChange={(event) => setBankData((current) => ({ ...current, branch_name: event.target.value }))} className={inputClass} />
                </label>
                <label className="text-sm font-medium text-gray-700 md:col-span-2">IFSC Code
                  <input required maxLength={11} value={bankData.ifsc_code} onChange={(event) => setBankData((current) => ({ ...current, ifsc_code: event.target.value.toUpperCase() }))} className={inputClass} />
                </label>
                <div className="md:col-span-2">
                  <button type="submit" disabled={saving} className="rounded-md bg-orange-600 px-5 py-2 font-medium text-white disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save Bank Details'}
                  </button>
                </div>
              </form>
            )}
            {activeMainSection === 'restaurant' && (
              <form onSubmit={saveRestaurant}>
            <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
              {sections.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSection(key)}
                  className={`whitespace-nowrap border-b-2 px-5 py-3 text-sm font-medium ${activeSection === key ? 'border-orange-600 text-orange-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-2">
              {activeSection === 'basic' && (
              <>
              <label className="text-sm font-medium text-gray-700 md:col-span-2">Restaurant Name
                <input required value={formData.name} onChange={(event) => setField('name', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700">Owner ID
                <input required readOnly={Boolean(ownerId)} value={formData.owner_id} onChange={(event) => setField('owner_id', event.target.value)} className={`${inputClass} ${ownerId ? 'bg-gray-100' : ''}`} />
              </label>
              <label className="text-sm font-medium text-gray-700">Phone
                <input value={formData.phone} onChange={(event) => setField('phone', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700 md:col-span-2">Address
                <input required value={formData.address} onChange={(event) => setField('address', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700">City
                <input required value={formData.city} onChange={(event) => setField('city', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700">Pincode
                <input value={formData.pincode} onChange={(event) => setField('pincode', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700">Latitude
                <input type="number" step="any" value={formData.latitude} onChange={(event) => setField('latitude', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700">Longitude
                <input type="number" step="any" value={formData.longitude} onChange={(event) => setField('longitude', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700">Email
                <input type="email" value={formData.email} onChange={(event) => setField('email', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700">Cuisine Types
                <input placeholder="Indian, Chinese" value={formData.cuisine_types} onChange={(event) => setField('cuisine_types', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700">Commission
                <input type="number" min="0" step="0.01" value={formData.commision} onChange={(event) => setField('commision', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700 md:col-span-2">Description
                <textarea value={formData.description} onChange={(event) => setField('description', event.target.value)} className={inputClass} rows="3" />
              </label>
              <label className="text-sm font-medium text-gray-700 md:col-span-2">Status
                <input value={formData.status} onChange={(event) => setField('status', event.target.value)} className={inputClass} />
              </label>
              </>
              )}
              {activeSection === 'media' && (
              <>
              <label className="text-sm font-medium text-gray-700">Image URL
                <input value={formData.image_url} onChange={(event) => setField('image_url', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700">Cover Image URL
                <input value={formData.cover_image_url} onChange={(event) => setField('cover_image_url', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700 md:col-span-2">
                FSSAI Document URL
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.fssai_document}
                    onChange={(event) => setField('fssai_document', event.target.value)}
                    placeholder="https://example.com/fssai-document.pdf"
                    className={inputClass}
                  />
                  {isDocumentUrl && (
                    <a
                      href={formData.fssai_document}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 flex shrink-0 items-center rounded-md border border-blue-200 px-3 py-2 font-medium text-blue-600 hover:bg-blue-50"
                    >
                      View
                    </a>
                  )}
                </div>
                {!isDocumentUrl && encryptedDocument && (
                  <p className="mt-2 break-all text-xs text-gray-500">
                    Stored reference: <span className="font-mono">{encryptedDocument}</span>
                  </p>
                )}
              </label>
              </>
              )}
              {activeSection === 'operations' && (
              <>
              <label className="text-sm font-medium text-gray-700">Opening Time
                <input type="time" value={formData.opening_time} onChange={(event) => setField('opening_time', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700">Closing Time
                <input type="time" value={formData.closing_time} onChange={(event) => setField('closing_time', event.target.value)} className={inputClass} />
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input type="checkbox" checked={formData.is_active} onChange={(event) => setField('is_active', event.target.checked)} /> Active
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input type="checkbox" checked={formData.is_open} onChange={(event) => setField('is_open', event.target.checked)} /> Open
              </label>
              <label className="text-sm font-medium text-gray-700">Delivery Fee
                <input type="number" min="0" step="0.01" value={formData.delivery_fee} onChange={(event) => setField('delivery_fee', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700">Minimum Order Amount
                <input type="number" min="0" step="0.01" value={formData.minimum_order_amount} onChange={(event) => setField('minimum_order_amount', event.target.value)} className={inputClass} />
              </label>
              <label className="text-sm font-medium text-gray-700">Estimated Delivery Time (minutes)
                <input type="number" min="1" value={formData.estimated_delivery_time} onChange={(event) => setField('estimated_delivery_time', event.target.value)} className={inputClass} />
              </label>
              </>
              )}
            </div>
            <div className="px-5 pb-5">
              <button type="submit" disabled={saving} className="rounded-md bg-orange-600 px-5 py-2 font-medium text-white disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Restaurant'}
              </button>
            </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
