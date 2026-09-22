import { User, Home, Settings, X } from 'lucide-react'
import ProfileList from './ProfileList'

export default function AppSidebar({ profiles, selectedId, onSelect, onCreateNew, isOpen, onClose, appName }) {
  return (
    <div className="app-sidebar">
      <nav className="icon-rail" aria-label="Primary">
        <button className="icon-rail-btn active" aria-label="User Profile">
          <User size={20} />
        </button>
        <button className="icon-rail-btn" aria-label="Home" disabled>
          <Home size={20} />
        </button>
        <button className="icon-rail-btn" aria-label="Settings" disabled>
          <Settings size={20} />
        </button>
      </nav>
      <aside className={`nav-sidebar ${isOpen ? 'drawer-open' : ''}`}>
        <div className="nav-sidebar-brand">{appName}</div>
        <button className="nav-sidebar-close" aria-label="Close menu" onClick={onClose}>
          <X size={18} />
        </button>
        <div className="nav-section">
          <div className="nav-section-title">Applications</div>
          <button className="nav-item active" type="button">
            User Profile
          </button>
        </div>
        <div className="nav-section">
          <div className="nav-section-title">Pages</div>
          <button className="nav-item" type="button" disabled aria-disabled="true">
            Settings
          </button>
          <button className="nav-item" type="button" disabled aria-disabled="true">
            Notifications
          </button>
        </div>
        <ProfileList
          profiles={profiles}
          selectedId={selectedId}
          onSelect={(id) => {
            onSelect(id)
            onClose?.()
          }}
          onCreateNew={onCreateNew}
        />
      </aside>
    </div>
  )
}
