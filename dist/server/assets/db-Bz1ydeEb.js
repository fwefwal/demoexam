import { n as TSS_SERVER_FUNCTION } from "../server.js";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as runtime from "@prisma/client/runtime/client";
import { PrismaPg } from "@prisma/adapter-pg";
//#region node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/generated/prisma/internal/class.ts
var config = {
	"previewFeatures": [],
	"clientVersion": "7.10.0",
	"engineVersion": "0edf323efd1d98336f3f0a68684b56f689b900d3",
	"activeProvider": "postgresql",
	"inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\n// Пользователь портала (role: user — обычный участник, admin — администратор)\nmodel User {\n  id        Int      @id @default(autoincrement())\n  login     String   @unique\n  fullname  String\n  password  String\n  phone     String\n  email     String\n  role      String   @default(\"user\")\n  createdAt DateTime @default(now())\n  entries   Entry[]\n  reviews   Review[]\n}\n\n// Демо-модель из стартера (страница /demo/prisma)\nmodel Todo {\n  id        Int      @id @default(autoincrement())\n  title     String\n  createdAt DateTime @default(now())\n}\n\n// Заявка на обучение по программе ДПО\nmodel Entry {\n  id          Int      @id @default(autoincrement())\n  course      String\n  paymentType String\n  userId      Int\n  user        User     @relation(fields: [userId], references: [id])\n  startAt     DateTime\n  status      String?  @default(\"Новая\")\n  createdAt   DateTime @default(now())\n  reviews     Review[]\n}\n\n// Отзыв о качестве образовательных услуг (только после завершения обучения)\nmodel Review {\n  id        Int      @id @default(autoincrement())\n  text      String\n  rating    Int      @default(5)\n  userId    Int\n  user      User     @relation(fields: [userId], references: [id])\n  entryId   Int\n  entry     Entry    @relation(fields: [entryId], references: [id])\n  createdAt DateTime @default(now())\n}\n",
	"runtimeDataModel": {
		"models": {},
		"enums": {},
		"types": {}
	},
	"parameterizationSchema": {
		"strings": [],
		"graph": ""
	}
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"login\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fullname\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phone\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"entries\",\"kind\":\"object\",\"type\":\"Entry\",\"relationName\":\"EntryToUser\"},{\"name\":\"reviews\",\"kind\":\"object\",\"type\":\"Review\",\"relationName\":\"ReviewToUser\"}],\"dbName\":null,\"schema\":null},\"Todo\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null,\"schema\":null},\"Entry\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"course\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"paymentType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"EntryToUser\"},{\"name\":\"startAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"status\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"reviews\",\"kind\":\"object\",\"type\":\"Review\",\"relationName\":\"EntryToReview\"}],\"dbName\":null,\"schema\":null},\"Review\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"text\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"rating\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ReviewToUser\"},{\"name\":\"entryId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"entry\",\"kind\":\"object\",\"type\":\"Entry\",\"relationName\":\"EntryToReview\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null,\"schema\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
	strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"user\",\"entry\",\"reviews\",\"_count\",\"entries\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"Todo.findUnique\",\"Todo.findUniqueOrThrow\",\"Todo.findFirst\",\"Todo.findFirstOrThrow\",\"Todo.findMany\",\"Todo.createOne\",\"Todo.createMany\",\"Todo.createManyAndReturn\",\"Todo.updateOne\",\"Todo.updateMany\",\"Todo.updateManyAndReturn\",\"Todo.upsertOne\",\"Todo.deleteOne\",\"Todo.deleteMany\",\"Todo.groupBy\",\"Todo.aggregate\",\"Entry.findUnique\",\"Entry.findUniqueOrThrow\",\"Entry.findFirst\",\"Entry.findFirstOrThrow\",\"Entry.findMany\",\"Entry.createOne\",\"Entry.createMany\",\"Entry.createManyAndReturn\",\"Entry.updateOne\",\"Entry.updateMany\",\"Entry.updateManyAndReturn\",\"Entry.upsertOne\",\"Entry.deleteOne\",\"Entry.deleteMany\",\"Entry.groupBy\",\"Entry.aggregate\",\"Review.findUnique\",\"Review.findUniqueOrThrow\",\"Review.findFirst\",\"Review.findFirstOrThrow\",\"Review.findMany\",\"Review.createOne\",\"Review.createMany\",\"Review.createManyAndReturn\",\"Review.updateOne\",\"Review.updateMany\",\"Review.updateManyAndReturn\",\"Review.upsertOne\",\"Review.deleteOne\",\"Review.deleteMany\",\"Review.groupBy\",\"Review.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"text\",\"rating\",\"userId\",\"entryId\",\"createdAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"course\",\"paymentType\",\"startAt\",\"status\",\"title\",\"login\",\"fullname\",\"password\",\"phone\",\"email\",\"role\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
	graph: "5AErQA0FAACDAQAgBwAAggEAIFAAAIEBADBRAAAQABBSAACBAQAwUwIAAAABWEAAfwAhaQEAAAABagEAfgAhawEAfgAhbAEAfgAhbQEAfgAhbgEAfgAhAQAAAAEAIAwDAACFAQAgBQAAgwEAIFAAAIcBADBRAAADABBSAACHAQAwUwIAfQAhVgIAfQAhWEAAfwAhZAEAfgAhZQEAfgAhZkAAfwAhZwEAiAEAIQMDAADRAQAgBQAA0AEAIGcAAJUBACAMAwAAhQEAIAUAAIMBACBQAACHAQAwUQAAAwAQUgAAhwEAMFMCAAAAAVYCAH0AIVhAAH8AIWQBAH4AIWUBAH4AIWZAAH8AIWcBAIgBACEDAAAAAwAgAQAABAAwAgAABQAgCwMAAIUBACAEAACGAQAgUAAAhAEAMFEAAAcAEFIAAIQBADBTAgB9ACFUAQB-ACFVAgB9ACFWAgB9ACFXAgB9ACFYQAB_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_ACFkAQB-ACFlAQB-ACFmQAB_ACFnAQCIAQAhcgAAAwAgcwAAAwAgDAMAAIUBACAFAACDAQAgUAAAhwEAMFEAAAMAEFIAAIcBADBTAgB9ACFWAgB9ACFYQAB_ACFkAQB-ACFlAQB-ACFmQAB_ACFnAQCIAQAhC1kBAAAAAVoBAAAABVsBAAAABVwBAAAAAV0BAAAAAV4BAAAAAV8BAAAAAWABAHoAIWEBAAAAAWIBAAAAAWMBAAAAAQAAAAAAAXcBAAAAAQV3AgAAAAF9AgAAAAF-AgAAAAF_AgAAAAGAAQIAAAABAXdAAAAAAQUUAADdAQAgFQAA4wEAIHQAAN4BACB1AADiAQAgegAAAQAgBRQAANsBACAVAADgAQAgdAAA3AEAIHUAAN8BACB6AAAFACADFAAA3QEAIHQAAN4BACB6AAABACADFAAA2wEAIHQAANwBACB6AAAFACAAAAAAAAABdwEAAAABBRQAANUBACAVAADZAQAgdAAA1gEAIHUAANgBACB6AAABACALFAAAngEAMBUAAKMBADB0AACfAQAwdQAAoAEAMHYAAKEBACB3AACiAQAweAAAogEAMHkAAKIBADB6AACiAQAwewAApAEAMHwAAKUBADAGAwAAkwEAIFMCAAAAAVQBAAAAAVUCAAAAAVYCAAAAAVhAAAAAAQIAAAAJACAUAACpAQAgAwAAAAkAIBQAAKkBACAVAACoAQAgAQ0AANcBADALAwAAhQEAIAQAAIYBACBQAACEAQAwUQAABwAQUgAAhAEAMFMCAAAAAVQBAH4AIVUCAH0AIVYCAH0AIVcCAH0AIVhAAH8AIQIAAAAJACANAACoAQAgAgAAAKYBACANAACnAQAgCVAAAKUBADBRAACmAQAQUgAApQEAMFMCAH0AIVQBAH4AIVUCAH0AIVYCAH0AIVcCAH0AIVhAAH8AIQlQAAClAQAwUQAApgEAEFIAAKUBADBTAgB9ACFUAQB-ACFVAgB9ACFWAgB9ACFXAgB9ACFYQAB_ACEFUwIAjwEAIVQBAI4BACFVAgCPAQAhVgIAjwEAIVhAAJABACEGAwAAkQEAIFMCAI8BACFUAQCOAQAhVQIAjwEAIVYCAI8BACFYQACQAQAhBgMAAJMBACBTAgAAAAFUAQAAAAFVAgAAAAFWAgAAAAFYQAAAAAEDFAAA1QEAIHQAANYBACB6AAABACAEFAAAngEAMHQAAJ8BADB2AAChAQAgegAAogEAMAAAAAAAAAAAAAALFAAAwQEAMBUAAMYBADB0AADCAQAwdQAAwwEAMHYAAMQBACB3AADFAQAweAAAxQEAMHkAAMUBADB6AADFAQAwewAAxwEAMHwAAMgBADALFAAAuAEAMBUAALwBADB0AAC5AQAwdQAAugEAMHYAALsBACB3AACiAQAweAAAogEAMHkAAKIBADB6AACiAQAwewAAvQEAMHwAAKUBADAGBAAAlAEAIFMCAAAAAVQBAAAAAVUCAAAAAVcCAAAAAVhAAAAAAQIAAAAJACAUAADAAQAgAwAAAAkAIBQAAMABACAVAAC_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"
};
async function decodeBase64AsWasm(wasmBase64) {
	const { Buffer } = await import("node:buffer");
	const wasmArray = Buffer.from(wasmBase64, "base64");
	return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
	getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
	getQueryCompilerWasmModule: async () => {
		const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
		return await decodeBase64AsWasm(wasm);
	},
	importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
	return runtime.getPrismaClient(config);
}
runtime.Extensions.getExtensionContext;
runtime.NullTypes.DbNull, runtime.NullTypes.JsonNull, runtime.NullTypes.AnyNull;
runtime.makeStrictEnum({
	ReadUncommitted: "ReadUncommitted",
	ReadCommitted: "ReadCommitted",
	RepeatableRead: "RepeatableRead",
	Serializable: "Serializable"
});
runtime.Extensions.defineExtension;
//#endregion
//#region src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
/**
* ## Prisma Client
* 
* Type-safe database client for TypeScript
* @example
* ```
* const prisma = new PrismaClient({
*   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
* })
* // Fetch zero or more Users
* const users = await prisma.user.findMany()
* ```
* 
* Read more in our [docs](https://pris.ly/d/client).
*/
var PrismaClient = getPrismaClientClass();
//#endregion
//#region src/database-url.ts
function getDatabaseUrl() {
	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl) throw new Error("DATABASE_URL is required");
	return databaseUrl;
}
//#endregion
//#region src/db.ts
var adapter = new PrismaPg({ connectionString: getDatabaseUrl() });
var prisma = globalThis.__prisma || new PrismaClient({ adapter });
//#endregion
export { createServerRpc as n, prisma as t };
