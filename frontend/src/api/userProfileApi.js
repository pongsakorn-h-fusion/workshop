const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5019'
const USER_PROFILES_URL = `${API_BASE_URL}/api/user-profiles`

async function handleResponse(response) {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with status ${response.status}`)
  }
  if (response.status === 204) {
    return null
  }
  return response.json()
}

export function getUserProfiles() {
  return fetch(USER_PROFILES_URL).then(handleResponse)
}

export function getUserProfile(id) {
  return fetch(`${USER_PROFILES_URL}/${id}`).then(handleResponse)
}

export function createUserProfile(payload) {
  return fetch(USER_PROFILES_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(handleResponse)
}

export function updateUserProfile(id, payload) {
  return fetch(`${USER_PROFILES_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(handleResponse)
}

export function deleteUserProfile(id) {
  return fetch(`${USER_PROFILES_URL}/${id}`, { method: 'DELETE' }).then(handleResponse)
}
