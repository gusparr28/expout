import { useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="flex flex-col">
				<button
					className="bg-red-800 hover:bg-red-300"
					onClick={() => setCount((count) => count + 1)}
					type="button"
				>
					up
				</button>
				<button
					className="bg-slate-600"
					onClick={() => setCount((count) => count - 1)}
					type="button"
				>
					down
				</button>
				<p>{count}</p>
			</div>
		</>
	);
}

export default App;
