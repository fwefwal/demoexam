import { createFileRoute, Link } from '@tanstack/react-router'
import Slider from '#/components/Slider'
import '#/pages.css'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const FEATURES = [
  {
    title: 'Программы обучения',
    text: 'Основы алгоритмизации и программирования, основы веб-дизайна, основы проектирования баз данных.',
  },
  {
    title: 'Личный кабинет',
    text: 'Все заявки пользователей хранятся в базе данных — статус обучения всегда под рукой.',
  },
  {
    title: 'Отзывы о качестве',
    text: 'После завершения обучения можно оставить отзыв о качестве образовательных услуг.',
  },
]

function HomePage() {
  return (
    <main className="page-wrap home-page">
      <section className="island-shell home-hero">
        <p className="island-kicker mb-2">Корочки.есть</p>
        <h1 className="display-title home-title">
          Портал записи на онлайн курсы дополнительного профессионального
          образования
        </h1>
        <p className="home-subtitle">
          Пройдите регистрацию, войдите в систему и оформите заявку на обучение.
          Заявка уходит администратору портала на рассмотрение.
        </p>

        <div className="home-actions">
          <Link className="demo-button" to="/register">
            Регистрация
          </Link>
          <Link className="demo-button demo-button-secondary" to="/login">
            Войти
          </Link>
        </div>
      </section>

      <Slider />

      <section className="home-features">
        {FEATURES.map((feature) => (
          <article key={feature.title} className="feature-card home-card">
            <h2 className="demo-section-title mb-2">{feature.title}</h2>
            <p className="demo-muted m-0 text-sm">{feature.text}</p>
          </article>
        ))}
      </section>
    </main>
  )
}