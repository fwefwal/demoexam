import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { FieldErrors } from '#/lib/validation'
import type { AuthResult } from '#/server/auth'
import { registerUser } from '#/server/auth'
import '#/pages.css'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

type RegisterForm = {
  login: string
  password: string
  fullname: string
  phone: string
  email: string
}

const EMPTY_FORM: RegisterForm = {
  login: '',
  password: '',
  fullname: '',
  phone: '',
  email: '',
}

function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState<RegisterForm>(EMPTY_FORM)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(field: keyof RegisterForm, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSubmitting(true)
    setFieldErrors({})
    setFormError('')

    try {
      const result: AuthResult = await registerUser({ data: form })

      if (result.ok) {
        await navigate({ to: '/' })
        return
      }

      setFieldErrors(result.fieldErrors ?? {})
      setFormError(result.formError ?? '')
    } catch (error) {
      console.error('Ошибка регистрации:', error)
      setFormError('Не удалось зарегистрироваться. Попробуйте ещё раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page-wrap auth-page">
      <section className="island-shell auth-card">
        <p className="island-kicker mb-2">Корочки.есть</p>
        <h1 className="display-title auth-title">Регистрация</h1>
        <p className="auth-subtitle">
          Создайте аккаунт, чтобы записаться на курсы дополнительного
          профессионального образования.
        </p>

        {formError ? <div className="alert alert-danger">{formError}</div> : null}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span className="field-label">Логин</span>
            <input
              className={`demo-input${fieldErrors.login ? ' is-invalid' : ''}`}
              name="login"
              value={form.login}
              onChange={(event) => updateField('login', event.target.value)}
              placeholder="Например, ivanov01"
            />
            {fieldErrors.login ? (
              <span className="field-error">{fieldErrors.login}</span>
            ) : null}
          </label>

          <label className="field">
            <span className="field-label">Пароль</span>
            <input
              className={`demo-input${fieldErrors.password ? ' is-invalid' : ''}`}
              type="password"
              name="password"
              value={form.password}
              onChange={(event) => updateField('password', event.target.value)}
              placeholder="Не менее 8 символов"
            />
            {fieldErrors.password ? (
              <span className="field-error">{fieldErrors.password}</span>
            ) : null}
          </label>

          <label className="field">
            <span className="field-label">ФИО</span>
            <input
              className={`demo-input${fieldErrors.fullname ? ' is-invalid' : ''}`}
              name="fullname"
              value={form.fullname}
              onChange={(event) => updateField('fullname', event.target.value)}
              placeholder="Иванов Иван Иванович"
            />
            {fieldErrors.fullname ? (
              <span className="field-error">{fieldErrors.fullname}</span>
            ) : null}
          </label>

          <label className="field">
            <span className="field-label">Телефон</span>
            <input
              className={`demo-input${fieldErrors.phone ? ' is-invalid' : ''}`}
              name="phone"
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              placeholder="8(900)123-45-67"
            />
            {fieldErrors.phone ? (
              <span className="field-error">{fieldErrors.phone}</span>
            ) : null}
          </label>

          <label className="field">
            <span className="field-label">Email</span>
            <input
              className={`demo-input${fieldErrors.email ? ' is-invalid' : ''}`}
              type="email"
              name="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="mail@example.com"
            />
            {fieldErrors.email ? (
              <span className="field-error">{fieldErrors.email}</span>
            ) : null}
          </label>

          <button
            className="demo-button auth-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправляем...' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="auth-switch">
          <Link to="/login">Уже зарегистрированы? Войти</Link>
        </p>
      </section>
    </main>
  )
}