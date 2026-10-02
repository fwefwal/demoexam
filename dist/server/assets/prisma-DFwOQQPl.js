import { t as createServerFn } from "../server.js";
import { t as createSsrRpc } from "./createSsrRpc-BdB2e2iw.js";
import { n as Route } from "./router-C2BldHQg.js";
import { useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/demo/prisma.tsx?tsr-split=component
var createTodo = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("2adba21271495b23b6756a8b8c060d3fb5de57820ef897f2175dced68bde9bae"));
function DemoPrisma() {
	const router = useRouter();
	const todos = Route.useLoaderData();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		const title = new FormData(form).get("title");
		if (typeof title !== "string" || !title) return;
		try {
			await createTodo({ data: { title } });
			router.invalidate();
			form.reset();
		} catch (error) {
			console.error("Failed to create todo:", error);
		}
	};
	return /* @__PURE__ */ jsx("main", {
		className: "demo-page demo-center",
		children: /* @__PURE__ */ jsxs("section", {
			className: "demo-panel w-full max-w-2xl",
			children: [
				/* @__PURE__ */ jsxs("header", {
					className: "mb-8 flex items-center gap-4",
					children: [/* @__PURE__ */ jsx("span", {
						className: "demo-card flex h-14 w-14 items-center justify-center p-3",
						children: /* @__PURE__ */ jsx("img", {
							src: "/prisma.svg",
							alt: "Prisma Logo",
							className: "h-8 w-8"
						})
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
						className: "island-kicker mb-2",
						children: "Database"
					}), /* @__PURE__ */ jsx("h1", {
						className: "demo-title",
						children: "Prisma Demo"
					})] })]
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "demo-section-title mb-4",
					children: "Todos"
				}),
				/* @__PURE__ */ jsxs("ul", {
					className: "space-y-3 mb-6",
					children: [todos.map((todo) => /* @__PURE__ */ jsx("li", {
						className: "demo-list-item",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-medium",
								children: todo.title
							}), /* @__PURE__ */ jsxs("span", {
								className: "demo-muted text-xs",
								children: ["#", todo.id]
							})]
						})
					}, todo.id)), todos.length === 0 && /* @__PURE__ */ jsx("li", {
						className: "demo-list-item text-center demo-muted",
						children: "No todos yet. Create one below!"
					})]
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "flex flex-col gap-2 sm:flex-row",
					children: [/* @__PURE__ */ jsx("input", {
						type: "text",
						name: "title",
						placeholder: "Add a new todo...",
						className: "demo-input min-w-0 flex-1"
					}), /* @__PURE__ */ jsx("button", {
						type: "submit",
						className: "demo-button whitespace-nowrap",
						children: "Add Todo"
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "demo-card mt-8",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "demo-section-title mb-2",
							children: "Powered by Prisma ORM"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "demo-muted mb-4 text-sm",
							children: "Next-generation ORM for Node.js & TypeScript with PostgreSQL"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2 text-sm",
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-medium",
								children: "Setup Instructions:"
							}), /* @__PURE__ */ jsxs("ol", {
								className: "demo-muted list-inside list-decimal space-y-2",
								children: [
									/* @__PURE__ */ jsxs("li", { children: [
										"Configure your ",
										/* @__PURE__ */ jsx("code", { children: "DATABASE_URL" }),
										" in .env.local"
									] }),
									/* @__PURE__ */ jsxs("li", { children: ["Run: ", /* @__PURE__ */ jsx("code", { children: "npm run db:generate" })] }),
									/* @__PURE__ */ jsxs("li", { children: ["Run: ", /* @__PURE__ */ jsx("code", { children: "npm run db:push" })] }),
									/* @__PURE__ */ jsxs("li", { children: ["Optional: ", /* @__PURE__ */ jsx("code", { children: "npm run db:studio" })] })
								]
							})]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { DemoPrisma as component };
