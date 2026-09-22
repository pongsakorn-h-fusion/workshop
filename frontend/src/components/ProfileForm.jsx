import { useEffect, useState } from 'react'

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  bio: '',
  avatarUrl: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(name, value) {
  switch (name) {
    case 'firstName':
      if (!value.trim()) return 'First name is required'
      if (value.length > 50) return 'First name must be 50 characters or less'
      return ''
    case 'lastName':
      if (!value.trim()) return 'Last name is required'
      if (value.length > 50) return 'Last name must be 50 characters or less'
      return ''
    case 'email':
      if (!value.trim()) return 'Email is required'
      if (!EMAIL_PATTERN.test(value)) return 'Enter a valid email address'
      return ''
    case 'phoneNumber':
      if (value.length > 20) return 'Phone number must be 20 characters or less'
      return ''
    case 'bio':
      if (value.length > 500) return 'Bio must be 500 characters or less'
      return ''
    default:
      return ''
  }
}

function validateForm(form) {
  const errors = {}
  Object.keys(form).forEach((key) => {
    const message = validateField(key, form[key])
    if (message) errors[key] = message
  })
  return errors
}

export default function ProfileForm({ profile, onSave, onCancel, saving }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(
      profile
        ? {
            firstName: profile.firstName ?? '',
            lastName: profile.lastName ?? '',
            email: profile.email ?? '',
            phoneNumber: profile.phoneNumber ?? '',
            bio: profile.bio ?? '',
            avatarUrl: profile.avatarUrl ?? '',
          }
        : EMPTY_FORM,
    )
    setErrors({})
  }, [profile])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: validateField(name, value) } : prev))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateForm(form)
    if (Object.keys(nextErrors).some((key) => nextErrors[key])) {
      setErrors(nextErrors)
      return
    }
    onSave(form)
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit} noValidate>
      <div className="profile-form-grid">
        <div className="form-row">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            maxLength={50}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          {errors.firstName && (
            <span className="field-error" id="firstName-error">
              {errors.firstName}
            </span>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            maxLength={50}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
          {errors.lastName && (
            <span className="field-error" id="lastName-error">
              {errors.lastName}
            </span>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span className="field-error" id="email-error">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            maxLength={20}
            aria-invalid={!!errors.phoneNumber}
            aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
          />
          {errors.phoneNumber && (
            <span className="field-error" id="phoneNumber-error">
              {errors.phoneNumber}
            </span>
          )}
        </div>

        <div className="form-row form-row-full">
          <label htmlFor="avatarUrl">Avatar URL</label>
          <input
            id="avatarUrl"
            name="avatarUrl"
            value={form.avatarUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
          {errors.avatarUrl && <span className="field-error">{errors.avatarUrl}</span>}
        </div>

        <div className="form-row form-row-full">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={4}
            maxLength={500}
            aria-invalid={!!errors.bio}
            aria-describedby={errors.bio ? 'bio-error' : undefined}
          />
          {errors.bio && (
            <span className="field-error" id="bio-error">
              {errors.bio}
            </span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      {saving && (
        <p className="form-status" role="status">
          Saving changes…
        </p>
      )}
    </form>
  )
}
