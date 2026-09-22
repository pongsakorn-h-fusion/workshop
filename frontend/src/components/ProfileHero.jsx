import ProfileTabs from './ProfileTabs'

function getInitials(firstName, lastName) {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()
}

export default function ProfileHero({ profile, onEdit, onDelete, activeTab, onTabChange }) {
  return (
    <section className="profile-hero">
      <div className="profile-hero-cover">
        <img className="profile-hero-cover-img" src="/images/profile-cover.svg" alt="" />
        <div className="profile-hero-overlay" aria-hidden="true"></div>
      </div>
      <div className="profile-hero-body">
        <div className="profile-hero-avatar">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="" className="avatar-img" />
          ) : (
            <span className="avatar-placeholder">{getInitials(profile.firstName, profile.lastName)}</span>
          )}
        </div>
        <div className="profile-hero-info">
          <h2 className="profile-hero-name">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="profile-hero-meta">{profile.email}</p>
        </div>
        {/* Presentation-only placeholder stats until backend supports them */}
        <div className="profile-hero-stats">
          <div className="stat-item">
            <span className="stat-value">24</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">1.2k</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">340</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
        <div className="profile-hero-actions">
          <button type="button" className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
          <button type="button" className="btn btn-primary" onClick={onEdit}>
            Edit profile
          </button>
        </div>
      </div>
      <ProfileTabs activeTab={activeTab} onTabChange={onTabChange} />
    </section>
  )
}
