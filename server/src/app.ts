import { Hono } from "hono";
import { logger } from "hono/logger";
import expensesRoute from "./routes/expenses";

const app = new Hono().basePath("/api");

app.use(logger());

app.get("/", (c) => {
	return c.json({
		message: "do not go gentle into that good night",
	});
});

app.route("/expenses", expensesRoute);

export default app;
