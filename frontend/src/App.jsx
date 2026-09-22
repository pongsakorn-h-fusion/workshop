import { useEffect, useState } from 'react'
import {
  createUserProfile,
  deleteUserProfile,
  getUserProfiles,
  updateUserProfile,
} from './api/userProfileApi'
import ProfileForm from './components/ProfileForm'
import ProfileView from './components/ProfileView'
import AppSidebar from './components/AppSidebar'
import TopBar from './components/TopBar'
import './App.css'

function App() {
  const [profiles, setProfiles] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [mode, setMode] = useState('view') // 'view' | 'edit' | 'create'
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    loadProfiles()
  }, [])

  useEffect(() => {
    if (!sidebarOpen) return
    function handleKeyDown(event) {
      if (event.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sidebarOpen])

  async function loadProfiles(preferredId) {
    setLoading(true)
    setError(null)
    try {
      const data = await getUserProfiles()
      setProfiles(data)
      const nextId = preferredId ?? data[0]?.id ?? null
      setSelectedId(nextId)
      setMode('view')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleCreateNew() {
    setSelectedId(null)
    setMode('create')
  }

  async function handleSave(formData) {
    setSaving(true)
    setError(null)
    try {
      if (mode === 'create') {
        const created = await createUserProfile(formData)
        await loadProfiles(created.id)
      } else {
        const updated = await updateUserProfile(selectedId, formData)
        await loadProfiles(updated.id)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!selectedId) return
    if (!window.confirm('Delete this profile?')) return
    setError(null)
    try {
      await deleteUserProfile(selectedId)
      await loadProfiles()
    } catch (err) {
      setError(err.message)
    }
  }

  const selectedProfile = profiles.find((p) => p.id === selectedId) ?? null

  return (
    <div className="app-shell">
      <AppSidebar
        profiles={profiles}
        selectedId={selectedId}
        onSelect={(id) => {
          setSelectedId(id)
          setMode('view')
        }}
        onCreateNew={() => {
          handleCreateNew()
          setSidebarOpen(false)
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        appName="ProfileHub"
      />

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <div className="app-content">
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        />

        <main className="main-content">
          <div className="content-header">
            <h1>User Profile</h1>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              Home / User Profile
            </nav>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {loading && (
            <>
              <div className="skeleton skeleton-hero" />
              <div className="skeleton-line" style={{ width: '60%', marginTop: 16 }} />
              <div className="skeleton-line" style={{ width: '40%' }} />
            </>
          )}

          {!loading && mode === 'create' && (
            <ProfileForm onSave={handleSave} onCancel={() => loadProfiles(selectedId)} saving={saving} />
          )}

          {!loading && mode === 'edit' && selectedProfile && (
            <ProfileForm
              profile={selectedProfile}
              onSave={handleSave}
              onCancel={() => setMode('view')}
              saving={saving}
            />
          )}

          {!loading && mode === 'view' && selectedProfile && (
            <ProfileView
              profile={selectedProfile}
              onEdit={() => setMode('edit')}
              onDelete={handleDelete}
            />
          )}

          {!loading && mode === 'view' && !selectedProfile && (
            <div className="empty-state">
              <p>Select a profile or create a new one to get started.</p>
              <button type="button" className="btn btn-primary" onClick={handleCreateNew}>
                Create profile
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App


