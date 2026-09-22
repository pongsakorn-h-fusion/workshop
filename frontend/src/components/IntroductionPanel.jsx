import { FileText, Mail, Phone, Clock } from 'lucide-react'

export default function IntroductionPanel({ profile }) {
  return (
    <div className="introduction-panel">
      <h3 className="panel-title">Introduction</h3>
      <ul className="intro-list">
        <li className="intro-item">
          <span className="intro-item-icon" aria-hidden="true">
            <FileText size={16} />
          </span>
          <span className="intro-item-text">
            <span className="intro-item-label">Bio</span>
            <span className="intro-item-value">{profile.bio || 'Not provided'}</span>
          </span>
        </li>
        <li className="intro-item">
          <span className="intro-item-icon" aria-hidden="true">
            <Mail size={16} />
          </span>
          <span className="intro-item-text">
            <span className="intro-item-label">Email</span>
            <span className="intro-item-value">{profile.email}</span>
          </span>
        </li>
        <li className="intro-item">
          <span className="intro-item-icon" aria-hidden="true">
            <Phone size={16} />
          </span>
          <span className="intro-item-text">
            <span className="intro-item-label">Phone</span>
            <span className="intro-item-value">{profile.phoneNumber || 'Not provided'}</span>
          </span>
        </li>
        <li className="intro-item">
          <span className="intro-item-icon" aria-hidden="true">
            <Clock size={16} />
          </span>
          <span className="intro-item-text">
            <span className="intro-item-label">Last updated</span>
            <span className="intro-item-value">{new Date(profile.updatedAt).toLocaleString()}</span>
          </span>
        </li>
      </ul>
    </div>
  )
}
