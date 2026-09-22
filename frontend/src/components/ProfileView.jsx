import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import ProfileHero from './ProfileHero'
import IntroductionPanel from './IntroductionPanel'

export default function ProfileView({ profile, onEdit, onDelete }) {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="profile-view">
      <ProfileHero
        profile={profile}
        onEdit={onEdit}
        onDelete={onDelete}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="profile-tab-panel">
        <div className="profile-content-grid">
          <IntroductionPanel profile={profile} />
          <div className="details-panel">
            <div className="details-card">
              <h3 className="panel-title">Profile details</h3>
              <dl className="profile-details">
                <dt>First name</dt>
                <dd>{profile.firstName}</dd>
                <dt>Last name</dt>
                <dd>{profile.lastName}</dd>
                <dt>Email</dt>
                <dd>{profile.email}</dd>
                <dt>Phone</dt>
                <dd>{profile.phoneNumber || 'Not provided'}</dd>
              </dl>
            </div>
            <div className="details-card">
              <h3 className="panel-title">Recent update</h3>
              <p className="muted">Last updated {new Date(profile.updatedAt).toLocaleString()}</p>
            </div>
            <div className="empty-state">
              <Sparkles size={20} aria-hidden="true" />
              <p>Activity feed is coming soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
