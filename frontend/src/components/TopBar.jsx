import { Menu, Search, Sun, Moon, Bell } from 'lucide-react'

export default function TopBar({ onMenuClick, theme, onToggleTheme }) {
  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <button className="menu-toggle" aria-label="Open navigation menu" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <button className="top-bar-btn" aria-label="Search" type="button">
          <Search size={18} />
        </button>
      </div>
      <div className="top-bar-actions">
        <button className="top-bar-btn" aria-label="Toggle theme" type="button" onClick={onToggleTheme}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="top-bar-btn" aria-label="Notifications" type="button">
          <Bell size={18} />
        </button>
        <span className="top-bar-avatar avatar avatar-sm avatar-placeholder" aria-hidden="true">
          U
        </span>
      </div>
    </header>
  )
}
