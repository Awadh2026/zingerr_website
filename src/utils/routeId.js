export const encodeRouteId = (value) => {
  const encoded = btoa(String(value))
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

export const decodeRouteId = (value) => {
  try {
    const base64 = String(value).replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    const decoded = atob(padded)
    if (encodeRouteId(decoded) === base64.replace(/=+$/g, '').replace(/\+/g, '-').replace(/\//g, '_')) {
      return decoded
    }
  } catch {
    // Backward compatibility for links that still contain a raw ID.
  }
  return value
}
