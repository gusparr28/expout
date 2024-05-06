import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const expensesRoute = new Hono();

const expenseSchema = z.object({
	id: z.number().positive().min(1),
	title: z.string().min(3).max(100),
	amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

const expenses: Expense[] = [
	{
		id: 1,
		title: "Water payment",
		amount: 125,
	},
	{
		id: 2,
		title: "Gas payment",
		amount: 123,
	},
	{
		id: 3,
		title: "Energy payment",
		amount: 126,
	},
];

expensesRoute.get("/", (c) => {
	return c.json({
		data: {
			expenses,
		},
	});
});

expensesRoute.post("/", zValidator("json", createPostSchema), async (c) => {
	const body = c.req.valid("json");
	const expense = createPostSchema.parse(body);
	const newExpense = {
		id: expenses.length + 1,
		...expense,
	};

	expenses.push(newExpense);

	return c.json(
		{
			data: {
				message: "Expense successfully created",
			},
		},
		201,
	);
});

expensesRoute.get("/:id{[0-9]+}", (c) => {
	const id = Number.parseInt(c.req.param("id"));

	const expense = expenses.find((expense) => expense.id === id);
	if (!expense) {
		return c.json(
			{
				message: `Expense ${id} not found`,
			},
			404,
		);
	}
	return c.json({
		data: {
			expense,
		},
	});
});

expensesRoute.delete("/:id{[0-9]+}", (c) => {
	const id = Number.parseInt(c.req.param("id"));

	const expenseIndex = expenses.findIndex((expense) => expense.id === id);
	if (expenseIndex === -1) {
		return c.json(
			{
				message: `Expense ${id} not found`,
			},
			404,
		);
	}

	expenses.splice(expenseIndex, 1);

	return c.json({
		data: {
			message: "Expense successfully deleted",
		},
	});
});

export default expensesRoute;
