import { t as createServerFn } from "../server.js";
import { n as createServerRpc, t as prisma } from "./db-Bz1ydeEb.js";
//#region src/routes/demo/prisma.tsx?tss-serverfn-split
var getTodos_createServerFn_handler = createServerRpc({
	id: "59b2bd1e668af9a46f5aa458a60d83ca482b7916add8e92b56271ac8a322c4b2",
	name: "getTodos",
	filename: "src/routes/demo/prisma.tsx"
}, (opts) => getTodos.__executeServer(opts));
var getTodos = createServerFn({ method: "GET" }).handler(getTodos_createServerFn_handler, async () => {
	return await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
});
var createTodo_createServerFn_handler = createServerRpc({
	id: "2adba21271495b23b6756a8b8c060d3fb5de57820ef897f2175dced68bde9bae",
	name: "createTodo",
	filename: "src/routes/demo/prisma.tsx"
}, (opts) => createTodo.__executeServer(opts));
var createTodo = createServerFn({ method: "POST" }).validator((data) => data).handler(createTodo_createServerFn_handler, async ({ data }) => {
	return await prisma.todo.create({ data });
});
//#endregion
export { createTodo_createServerFn_handler, getTodos_createServerFn_handler };
