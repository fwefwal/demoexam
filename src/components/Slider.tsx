import { useCallback, useEffect, useState } from 'react'
import slideOne from '#/assets/slider/image08.webp'
import slideTwo from '#/assets/slider/image10.webp'
import slideThree from '#/assets/slider/image12.webp'
import slideFour from '#/assets/slider/image13.webp'

const AUTO_SLIDE_INTERVAL = 3000

const SLIDES = [
  { src: slideOne, alt: 'Обучение на курсах дополнительного образования' },
  { src: slideTwo, alt: 'Практические занятия по программированию' },
  { src: slideThree, alt: 'Занятия по веб-дизайну' },
  { src: slideFour, alt: 'Проектирование баз данных' },
]

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goToSlide = useCallback((nextIndex: number) => {
    setActiveIndex((nextIndex + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length)
    }, AUTO_SLIDE_INTERVAL)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section
      className="slider"
      aria-roledescription="carousel"
      aria-label="Галерея направлений обучения"
    >
      <div className="slider-viewport">
        {SLIDES.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`slider-image${index === activeIndex ? ' is-active' : ''}`}
          />
        ))}
      </div>

      <button
        type="button"
        className="slider-control slider-control-prev"
        onClick={() => goToSlide(activeIndex - 1)}
        aria-label="Предыдущий слайд"
      >
        ‹
      </button>

      <button
        type="button"
        className="slider-control slider-control-next"
        onClick={() => goToSlide(activeIndex + 1)}
        aria-label="Следующий слайд"
      >
        ›
      </button>

      <div className="slider-dots">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={`slider-dot${index === activeIndex ? ' is-active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Слайд ${index + 1}`}
            aria-current={index === activeIndex}
          />
        ))}
      </div>
    </section>
  )
}
