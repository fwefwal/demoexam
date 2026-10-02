import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { logoutUser } from '#/server/auth'
import '#/pages.css'

export const Route = createFileRoute('/logout')({
  component: LogoutPage,
})

function LogoutPage() {
  const navigate = useNavigate()

  async function handleLogout() {
    await logoutUser()
    await navigate({ to: '/login' })
  }

  return (
    <main className="page-wrap auth-page">
      <section className="island-shell auth-card">
        <h1 className="display-title auth-title">Выход</h1>
        <p className="auth-subtitle">Завершить текущую сессию?</p>
        <button
          type="button"
          className="demo-button auth-submit"
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </button>
      </section>
    </main>
  )
}