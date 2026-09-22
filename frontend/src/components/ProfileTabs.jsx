export default function ProfileTabs({ activeTab, onTabChange }) {
  return (
    <nav className="profile-tabs" role="tablist" aria-label="Profile sections">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'profile'}
        className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => onTabChange('profile')}
      >
        Profile
      </button>
      <button
        type="button"
        role="tab"
        aria-selected="false"
        aria-disabled="true"
        disabled
        className="profile-tab disabled"
        title="Coming soon"
      >
        Activity
      </button>
      <button
        type="button"
        role="tab"
        aria-selected="false"
        aria-disabled="true"
        disabled
        className="profile-tab disabled"
        title="Coming soon"
      >
        Connections
      </button>
      <button
        type="button"
        role="tab"
        aria-selected="false"
        aria-disabled="true"
        disabled
        className="profile-tab disabled"
        title="Coming soon"
      >
        Gallery
      </button>
    </nav>
  )
}
