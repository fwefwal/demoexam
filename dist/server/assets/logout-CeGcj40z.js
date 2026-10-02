import "./router-C2BldHQg.js";
import { n as logoutUser } from "./auth-DrXYFozT.js";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/logout.tsx?tsr-split=component
function LogoutPage() {
	const navigate = useNavigate();
	async function handleLogout() {
		await logoutUser();
		await navigate({ to: "/login" });
	}
	return /* @__PURE__ */ jsx("main", {
		className: "page-wrap auth-page",
		children: /* @__PURE__ */ jsxs("section", {
			className: "island-shell auth-card",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "display-title auth-title",
					children: "Выход"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "auth-subtitle",
					children: "Завершить текущую сессию?"
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "demo-button auth-submit",
					onClick: handleLogout,
					children: "Выйти из аккаунта"
				})
			]
		})
	});
}
//#endregion
export { LogoutPage as component };
