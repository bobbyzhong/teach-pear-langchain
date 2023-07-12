"use client";
import { useState } from "react";

export default function PineconePage() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    async function createIndexAndEmneddings() {
        try {
            const result = await fetch("/api/setup", { method: "POST" });
            const json = await result.json();
            console.log("Result: ", json);
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    async function sendQuery() {
        if (!query) return;
        setResult("");
        setLoading(true);
        try {
            const result = await fetch("/api/read", {
                method: "POST",
                body: JSON.stringify(query),
            });
            const json = await result.json();
            setResult(json.data);
            setLoading(false);
        } catch (err) {
            console.log("Error: ", err);
            setLoading(false);
        }
    }

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <input
                className="px-2 py-1 border-2 "
                onChange={(e) => setQuery(e.target.value)}
            />

            <button
                className="px-7 py-1 rounded-2xl bg-white text-black mt-2 mb-2"
                onClick={sendQuery}
            >
                Ask AI
            </button>

            {loading && <p>Asking AI ...</p>}
            {result && <p>{result}</p>}

            <button onClick={createIndexAndEmneddings}>
                Create index and embeddings
            </button>
        </main>
    );
}
