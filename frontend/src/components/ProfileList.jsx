import { Plus } from 'lucide-react'

function getInitials(firstName, lastName) {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()
}

export default function ProfileList({ profiles, selectedId, onSelect, onCreateNew }) {
  return (
    <div className="profile-switcher">
      <div className="profile-switcher-header">
        <span className="nav-section-title">Profiles</span>
        <button
          type="button"
          className="profile-switcher-add"
          title="Create profile"
          aria-label="Create profile"
          onClick={onCreateNew}
        >
          <Plus size={16} />
        </button>
      </div>
      <ul className="profile-switcher-list">
        {profiles.map((profile) => (
          <li key={profile.id}>
            <button
              type="button"
              className={`profile-switcher-item ${profile.id === selectedId ? 'active' : ''}`}
              onClick={() => onSelect(profile.id)}
            >
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="" className="avatar avatar-sm" />
              ) : (
                <span className="avatar avatar-sm avatar-placeholder">
                  {getInitials(profile.firstName, profile.lastName)}
                </span>
              )}
              <span className="profile-switcher-item-text">
                <strong>
                  {profile.firstName} {profile.lastName}
                </strong>
                <small>{profile.email}</small>
              </span>
            </button>
          </li>
        ))}
        {profiles.length === 0 && <li className="empty-hint">No profiles yet.</li>}
      </ul>
    </div>
  )
}
