import "./router-C2BldHQg.js";
import { t as loginUser } from "./auth-DrXYFozT.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/login.tsx?tsr-split=component
function LoginPage() {
	const navigate = useNavigate();
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [fieldErrors, setFieldErrors] = useState({});
	const [formError, setFormError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	async function handleSubmit(event) {
		event.preventDefault();
		setIsSubmitting(true);
		setFieldErrors({});
		setFormError("");
		try {
			const result = await loginUser({ data: {
				login,
				password
			} });
			if (result.ok) {
				await navigate({ to: "/" });
				return;
			}
			setFieldErrors(result.fieldErrors ?? {});
			setFormError(result.formError ?? "");
		} catch (error) {
			console.error("Ошибка авторизации:", error);
			setFormError("Не удалось войти. Попробуйте ещё раз.");
		} finally {
			setIsSubmitting(false);
		}
	}
	return /* @__PURE__ */ jsx("main", {
		className: "page-wrap auth-page",
		children: /* @__PURE__ */ jsxs("section", {
			className: "island-shell auth-card",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "island-kicker mb-2",
					children: "Корочки.есть"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "display-title auth-title",
					children: "Авторизация"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "auth-subtitle",
					children: "Войдите, чтобы просмотреть свои заявки на обучение."
				}),
				formError ? /* @__PURE__ */ jsx("div", {
					className: "alert alert-danger",
					children: formError
				}) : null,
				/* @__PURE__ */ jsxs("form", {
					className: "auth-form",
					onSubmit: handleSubmit,
					noValidate: true,
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "field",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "field-label",
									children: "Логин"
								}),
								/* @__PURE__ */ jsx("input", {
									className: `demo-input${fieldErrors.login ? " is-invalid" : ""}`,
									name: "login",
									value: login,
									onChange: (event) => setLogin(event.target.value),
									placeholder: "Введите логин"
								}),
								fieldErrors.login ? /* @__PURE__ */ jsx("span", {
									className: "field-error",
									children: fieldErrors.login
								}) : null
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "field",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "field-label",
									children: "Пароль"
								}),
								/* @__PURE__ */ jsx("input", {
									className: `demo-input${fieldErrors.password ? " is-invalid" : ""}`,
									type: "password",
									name: "password",
									value: password,
									onChange: (event) => setPassword(event.target.value),
									placeholder: "Введите пароль"
								}),
								fieldErrors.password ? /* @__PURE__ */ jsx("span", {
									className: "field-error",
									children: fieldErrors.password
								}) : null
							]
						}),
						/* @__PURE__ */ jsx("button", {
							className: "demo-button auth-submit",
							type: "submit",
							disabled: isSubmitting,
							children: isSubmitting ? "Входим..." : "Войти"
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "auth-switch",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/register",
						children: "Еще не зарегистрированы? Регистрация"
					})
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
