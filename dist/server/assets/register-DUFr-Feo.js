import "./router-C2BldHQg.js";
import { r as registerUser } from "./auth-DrXYFozT.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/register.tsx?tsr-split=component
var EMPTY_FORM = {
	login: "",
	password: "",
	fullname: "",
	phone: "",
	email: ""
};
function RegisterPage() {
	const navigate = useNavigate();
	const [form, setForm] = useState(EMPTY_FORM);
	const [fieldErrors, setFieldErrors] = useState({});
	const [formError, setFormError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	function updateField(field, value) {
		setForm((previous) => ({
			...previous,
			[field]: value
		}));
	}
	async function handleSubmit(event) {
		event.preventDefault();
		setIsSubmitting(true);
		setFieldErrors({});
		setFormError("");
		try {
			const result = await registerUser({ data: form });
			if (result.ok) {
				await navigate({ to: "/" });
				return;
			}
			setFieldErrors(result.fieldErrors ?? {});
			setFormError(result.formError ?? "");
		} catch (error) {
			console.error("Ошибка регистрации:", error);
			setFormError("Не удалось зарегистрироваться. Попробуйте ещё раз.");
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
					children: "Регистрация"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "auth-subtitle",
					children: "Создайте аккаунт, чтобы записаться на курсы дополнительного профессионального образования."
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
									value: form.login,
									onChange: (event) => updateField("login", event.target.value),
									placeholder: "Например, ivanov01"
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
									value: form.password,
									onChange: (event) => updateField("password", event.target.value),
									placeholder: "Не менее 8 символов"
								}),
								fieldErrors.password ? /* @__PURE__ */ jsx("span", {
									className: "field-error",
									children: fieldErrors.password
								}) : null
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "field",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "field-label",
									children: "ФИО"
								}),
								/* @__PURE__ */ jsx("input", {
									className: `demo-input${fieldErrors.fullname ? " is-invalid" : ""}`,
									name: "fullname",
									value: form.fullname,
									onChange: (event) => updateField("fullname", event.target.value),
									placeholder: "Иванов Иван Иванович"
								}),
								fieldErrors.fullname ? /* @__PURE__ */ jsx("span", {
									className: "field-error",
									children: fieldErrors.fullname
								}) : null
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "field",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "field-label",
									children: "Телефон"
								}),
								/* @__PURE__ */ jsx("input", {
									className: `demo-input${fieldErrors.phone ? " is-invalid" : ""}`,
									name: "phone",
									value: form.phone,
									onChange: (event) => updateField("phone", event.target.value),
									placeholder: "8(900)123-45-67"
								}),
								fieldErrors.phone ? /* @__PURE__ */ jsx("span", {
									className: "field-error",
									children: fieldErrors.phone
								}) : null
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "field",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "field-label",
									children: "Email"
								}),
								/* @__PURE__ */ jsx("input", {
									className: `demo-input${fieldErrors.email ? " is-invalid" : ""}`,
									type: "email",
									name: "email",
									value: form.email,
									onChange: (event) => updateField("email", event.target.value),
									placeholder: "mail@example.com"
								}),
								fieldErrors.email ? /* @__PURE__ */ jsx("span", {
									className: "field-error",
									children: fieldErrors.email
								}) : null
							]
						}),
						/* @__PURE__ */ jsx("button", {
							className: "demo-button auth-submit",
							type: "submit",
							disabled: isSubmitting,
							children: isSubmitting ? "Отправляем..." : "Зарегистрироваться"
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "auth-switch",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/login",
						children: "Уже зарегистрированы? Войти"
					})
				})
			]
		})
	});
}
//#endregion
export { RegisterPage as component };
