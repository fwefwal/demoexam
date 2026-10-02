import "./router-C2BldHQg.js";
import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/assets/slider/image08.webp
var image08_default = "/assets/image08-BJ-oLxeV.webp";
//#endregion
//#region src/assets/slider/image10.webp
var image10_default = "/assets/image10-xuHUWN5V.webp";
//#endregion
//#region src/assets/slider/image12.webp
var image12_default = "/assets/image12-CNH-kAAD.webp";
//#endregion
//#region src/assets/slider/image13.webp
var image13_default = "/assets/image13-D7bkpC42.webp";
//#endregion
//#region src/components/Slider.tsx
/** Интервал автоматической смены слайдов (3 секунды по заданию). */
var AUTO_SLIDE_INTERVAL = 3e3;
var SLIDES = [
	{
		src: image08_default,
		alt: "Обучение на курсах дополнительного образования"
	},
	{
		src: image10_default,
		alt: "Практические занятия по программированию"
	},
	{
		src: image12_default,
		alt: "Занятия по веб-дизайну"
	},
	{
		src: image13_default,
		alt: "Проектирование баз данных"
	}
];
function Slider() {
	const [activeIndex, setActiveIndex] = useState(0);
	const goToSlide = useCallback((nextIndex) => {
		setActiveIndex((nextIndex + SLIDES.length) % SLIDES.length);
	}, []);
	useEffect(() => {
		const timer = window.setInterval(() => {
			setActiveIndex((current) => (current + 1) % SLIDES.length);
		}, AUTO_SLIDE_INTERVAL);
		return () => window.clearInterval(timer);
	}, []);
	return /* @__PURE__ */ jsxs("section", {
		className: "slider",
		"aria-roledescription": "carousel",
		"aria-label": "Галерея направлений обучения",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "slider-viewport",
				children: SLIDES.map((slide, index) => /* @__PURE__ */ jsx("img", {
					src: slide.src,
					alt: slide.alt,
					className: `slider-image${index === activeIndex ? " is-active" : ""}`
				}, slide.src))
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "slider-control slider-control-prev",
				onClick: () => goToSlide(activeIndex - 1),
				"aria-label": "Предыдущий слайд",
				children: "‹"
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				className: "slider-control slider-control-next",
				onClick: () => goToSlide(activeIndex + 1),
				"aria-label": "Следующий слайд",
				children: "›"
			}),
			/* @__PURE__ */ jsx("div", {
				className: "slider-dots",
				children: SLIDES.map((slide, index) => /* @__PURE__ */ jsx("button", {
					type: "button",
					className: `slider-dot${index === activeIndex ? " is-active" : ""}`,
					onClick: () => goToSlide(index),
					"aria-label": `Слайд ${index + 1}`,
					"aria-current": index === activeIndex
				}, slide.src))
			})
		]
	});
}
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var FEATURES = [
	{
		title: "Программы обучения",
		text: "Основы алгоритмизации и программирования, основы веб-дизайна, основы проектирования баз данных."
	},
	{
		title: "Личный кабинет",
		text: "Все заявки пользователей хранятся в базе данных — статус обучения всегда под рукой."
	},
	{
		title: "Отзывы о качестве",
		text: "После завершения обучения можно оставить отзыв о качестве образовательных услуг."
	}
];
function HomePage() {
	return /* @__PURE__ */ jsxs("main", {
		className: "page-wrap home-page",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "island-shell home-hero",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "island-kicker mb-2",
						children: "Корочки.есть"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "display-title home-title",
						children: "Портал записи на онлайн курсы дополнительного профессионального образования"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "home-subtitle",
						children: "Пройдите регистрацию, войдите в систему и оформите заявку на обучение. Заявка уходит администратору портала на рассмотрение."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "home-actions",
						children: [/* @__PURE__ */ jsx(Link, {
							className: "demo-button",
							to: "/register",
							children: "Регистрация"
						}), /* @__PURE__ */ jsx(Link, {
							className: "demo-button demo-button-secondary",
							to: "/login",
							children: "Войти"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(Slider, {}),
			/* @__PURE__ */ jsx("section", {
				className: "home-features",
				children: FEATURES.map((feature) => /* @__PURE__ */ jsxs("article", {
					className: "feature-card home-card",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "demo-section-title mb-2",
						children: feature.title
					}), /* @__PURE__ */ jsx("p", {
						className: "demo-muted m-0 text-sm",
						children: feature.text
					})]
				}, feature.title))
			})
		]
	});
}
//#endregion
export { HomePage as component };
