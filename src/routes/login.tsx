import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { FieldErrors } from '#/lib/validation'
import type { AuthResult } from '#/server/auth'
import { loginUser } from '#/server/auth'
import '#/pages.css'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSubmitting(true)
    setFieldErrors({})
    setFormError('')

    try {
      const result: AuthResult = await loginUser({ data: { login, password } })

      if (result.ok) {
        await navigate({ to: '/' })
        return
      }

      setFieldErrors(result.fieldErrors ?? {})
      setFormError(result.formError ?? '')
    } catch (error) {
      console.error('Ошибка авторизации:', error)
      setFormError('Не удалось войти. Попробуйте ещё раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page-wrap auth-page">
      <section className="island-shell auth-card">
        <p className="island-kicker mb-2">Корочки.есть</p>
        <h1 className="display-title auth-title">Авторизация</h1>
        <p className="auth-subtitle">
          Войдите, чтобы просмотреть свои заявки на обучение.
        </p>

        {formError ? <div className="alert alert-danger">{formError}</div> : null}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span className="field-label">Логин</span>
            <input
              className={`demo-input${fieldErrors.login ? ' is-invalid' : ''}`}
              name="login"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              placeholder="Введите логин"
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Введите пароль"
            />
            {fieldErrors.password ? (
              <span className="field-error">{fieldErrors.password}</span>
            ) : null}
          </label>

          <button
            className="demo-button auth-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Входим...' : 'Войти'}
          </button>
        </form>

        <p className="auth-switch">
          <Link to="/register">Еще не зарегистрированы? Регистрация</Link>
        </p>
      </section>
    </main>
  )
}