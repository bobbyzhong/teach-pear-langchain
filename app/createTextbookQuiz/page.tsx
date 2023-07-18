"use client";
import { LargeInputBox, InputBox, SelectBox } from "@/components/Inputs";
import Link from "next/link";
import { useState } from "react";

const QUIZ_CONFIG_INITIAL = {
    numQuestions: "3",
    difficulty: "easy",
    quizName: "",
    textbook: "",
    concepts: "",
    className: "",
};

export default function PineconePage() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const [quizConfig, setQuizConfig] = useState<any>(QUIZ_CONFIG_INITIAL);
    const [received, setReceived] = useState<any>(false);
    const [questions, setQuestions] = useState([]);
    const [choices, setChoices] = useState([[]]);
    const [key, setKey] = useState([]);

    // async function createIndexAndEmneddings() {
    //     try {
    //         const result = await fetch("/api/setup", { method: "POST" });
    //         const json = await result.json();
    //         console.log("Result: ", json);
    //     } catch (err) {
    //         console.log("Error: ", err);
    //     }
    // }

    async function sendQuery(config: any) {
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

    const handleChange = (e: any) => {
        setQuizConfig((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        console.log(quizConfig);
    };

    const requestQuiz = () => {
        let quizString = JSON.stringify(quizConfig);
        sendQuery(quizString);
    };

    return (
        <div className="bg-[#ececec] min-h-screen px-8 py-3">
            {/* Title */}
            <div className="flex flex-row items-end space-x-2 ">
                <Link href={"/demo"}>
                    <h1 className="font-outfit text-[2.1rem]">🍐 Pear</h1>
                </Link>

                <p className="font-semibold">Quiz Generator (with textbook)</p>
            </div>
            <div className="w-full mt-10">
                <div className="flex flex-row gap-16 h-[30.6rem] px-24">
                    <div className="w-full flex flex-col justify-between bg-[#fefefe] shadow-md  py-5 px-7 rounded-xl ">
                        <div className="flex flex-row gap-6">
                            <div className="flex flex-col gap-3 w-1/2">
                                <InputBox
                                    label="Quiz Name"
                                    name="quizName"
                                    placeholder="AP Euro Quiz 2"
                                    type="text"
                                    value={quizConfig.quizName}
                                    handleChange={handleChange}
                                />
                                <SelectBox
                                    placeholder="Number of Questions"
                                    options={[
                                        "1",
                                        "2",
                                        "3",
                                        "4",
                                        "5",
                                        "6",
                                        "7",
                                        "8",
                                        "9",
                                        "10",
                                    ]}
                                    handleChange={handleChange}
                                    statusCompleted={
                                        quizConfig.numQuestions ? true : false
                                    }
                                    label="Number of Questions"
                                    name="numQuestions"
                                />
                                <SelectBox
                                    placeholder="Easy"
                                    options={["Easy", "Medium", "Hard"]}
                                    handleChange={handleChange}
                                    statusCompleted={
                                        quizConfig.numQuestions ? true : false
                                    }
                                    label="Difficulty Level"
                                    name="difficulty"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-1/2">
                                <InputBox
                                    label="Class Name"
                                    name="className"
                                    placeholder="AP US History"
                                    type="text"
                                    value={quizConfig.className}
                                    handleChange={handleChange}
                                />
                                <SelectBox
                                    placeholder="Number of Questions"
                                    options={[
                                        "The American Pageant: A History of the American People",
                                        "Book 2",
                                    ]}
                                    handleChange={handleChange}
                                    statusCompleted={
                                        quizConfig.numQuestions ? true : false
                                    }
                                    label="Textbook Title"
                                    name="textbook"
                                />
                                <LargeInputBox
                                    label="Specific Concepts"
                                    name="concepts"
                                    placeholder="Put specific concepts that you want the quiz to contain here.
                                                For example: Columbian Exchange, Colonization, Revolutionary War "
                                    type="text"
                                    value={quizConfig.concepts}
                                    handleChange={handleChange}
                                    rows={5}
                                />
                            </div>
                        </div>
                        {loading ? (
                            <div>
                                <h1>Loading...</h1>
                            </div>
                        ) : (
                            <button className="" onClick={requestQuiz}>
                                Generate Quiz
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ORIGINAL */}
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

                {/* <button onClick={createIndexAndEmneddings}>
                Create index and embeddings
            </button> */}
            </main>
        </div>
    );
}
