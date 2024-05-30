import { useEffect, useState } from "react";
import "./App.css";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const requestTotalSpent = async () => {
	try {
		const request = await fetch("/api/expenses/total-spent", {
			method: "GET",
		});
		const { data } = await request.json();

		console.log("data", JSON.stringify(data, null, 2));

		return data.totalSpent;
	} catch (error) {
		console.error("An error has occurred", error);
	}
};

function App() {
	const [totalSpent, setTotalSpent] = useState(0);

	useEffect(() => {
		(async () => {
			const totalSpentAPI = await requestTotalSpent();
			setTotalSpent(totalSpentAPI);
		})();
	}, []);

	return (
		<Card className="w-[350px] m-auto">
			<CardHeader>
				<CardTitle>Total Spent</CardTitle>
				<CardDescription>The total amount you've spent</CardDescription>
			</CardHeader>
			<CardContent>{totalSpent}</CardContent>
		</Card>
	);
}

export default App;
