"use client";

import { useCompletion } from "ai/react";
import { useState, useEffect, useCallback } from "react";
import { InputBox, LargeInputBox, SelectBox } from "@/components/Inputs";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { useRef } from "react";

const QUIZ_CONFIG_INITIAL = {
    content: "",
    numQuestions: "3",
    difficulty: "easy",
    quizName: "Quiz Name",
};

export default function CreateQuiz() {
    // Locally store our blog posts content
    const [content, setContent] = useState("");
    const [quizConfig, setQuizConfig] = useState<any>(QUIZ_CONFIG_INITIAL);
    const [received, setReceived] = useState<any>(false);
    const [questions, setQuestions] = useState([]);
    const [choices, setChoices] = useState([[]]);
    const [key, setKey] = useState([]);
    const { complete, completion, setCompletion, isLoading } = useCompletion({
        api: "/api/standardQuiz",
    });

    const testObj = `{
  "questions": [
    "How many times a year do most penguin species breed?",
    "Which penguin species breeds twice in three years?"
  ],
  "choices": [
    ["A. Once", "B. Twice", "C. Three times"],
    ["A. African penguin", "B. Emperor penguin", "C. King penguin"]
  ],
  "answers": ["B", "C"]
}`;

    const submitContent = useCallback(
        async (config: any) => {
            // const completion = await complete(config);

            // if (!completion) throw new Error("Completion didn't work");
            const completion = testObj;
            console.log("string version:");
            console.log(completion);
            // const compList = completion.split(/\r?\n/);
            // const cutCompList = compList.slice(1, compList.length - 1);

            // const completionObj = JSON.parse(cutCompList.join(""));
            const completionObj = JSON.parse(testObj);

            console.log(completionObj);

            setQuestions(completionObj.questions);
            setChoices(completionObj.choices);
            setKey(completionObj.answers);
            setReceived(true);
        },
        [complete]
    );

    const handleChange = (e: any) => {
        setQuizConfig((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        console.log(quizConfig);
    };

    const requestQuiz = () => {
        let quizString = JSON.stringify(quizConfig);
        submitContent(quizString);
    };

    const componentRef = useRef(null);
    return (
        <div className="bg-[#ececec] min-h-screen px-8 py-3">
            {/* Title */}
            <div className="flex flex-row items-end space-x-2 ">
                <h1 className="font-outfit text-[2.1rem]">🍐 Pear</h1>
                <p className="font-semibold">Quiz Generator</p>
            </div>

            <div className="w-full mt-10">
                <div className="flex flex-row gap-16 h-[30.6rem] px-24">
                    <div className="w-7/12  ">
                        <LargeInputBox
                            label=""
                            name="content"
                            placeholder="Paste your content here"
                            type="text"
                            value={quizConfig.content}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="w-5/12 flex flex-col justify-between bg-[#fefefe] shadow-md  py-5 px-7 rounded-xl ">
                        <div className="flex flex-col gap-3">
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
                        {isLoading ? (
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

            {!received ? (
                <></>
            ) : (
                <div className="px-8 mt-10">
                    <ReactToPrint
                        trigger={() => {
                            return <a href="#">Print this out!</a>;
                        }}
                        content={() => componentRef.current}
                    />
                    <div className="px-16 rounded-xl">
                        <div
                            ref={componentRef}
                            className="bg-[#fefefe] px-12 py-8 rounded-xl font-tinos  min-h-[60rem]"
                        >
                            {/* HEADER SECTION */}
                            <div className="flex flex-row justify-between font-semibold ">
                                <h1 className="w-1/3">Name:</h1>
                                <h1 className="w-1/3 text-center ">
                                    AP European History
                                </h1>
                                <h1 className="w-1/3 text-center">
                                    Version: A
                                </h1>
                            </div>
                            {/* TITLE */}
                            <div className="text-xl font-semibold my-7">
                                {quizConfig.quizName}
                            </div>
                            {/* DESCRIPTION */}
                            <h1 className="font-semibold text-lg">
                                Multiple Choice
                            </h1>
                            <div className="italic mb-3">
                                Identify the choice that best completes the
                                statement or answers the question
                            </div>

                            {/* QUESTIONS */}
                            {questions.map((question, index) => (
                                <div className="px-8 mb-3">
                                    <h1>
                                        {index + 1}. {question}
                                    </h1>
                                    <div className="ml-5 ">
                                        {choices[0].map((choice, index) => (
                                            <div>{choice}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="mt-20">Answer: {key[0]}</div>
                        </div>
                    </div>
                    <div>{questions}</div>
                    <div>{choices}</div>
                    <div>{key}</div>
                </div>
            )}
        </div>
    );
}
