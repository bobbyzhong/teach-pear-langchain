"use client";

import { useCompletion } from "ai/react";
import { useState, useEffect, useCallback } from "react";
import { InputBox, LargeInputBox, SelectBox } from "@/components/Inputs";
import { divide } from "react-native-reanimated";

const QUIZ_CONFIG_INITIAL = {
    content: "",
    numQuestions: "3",
    difficulty: "easy",
    quizName: "",
};

const QUIZ_INFO_INITIAL = {
    quizName: "",
};

export default function CreateQuiz() {
    // Locally store our blog posts content
    const [content, setContent] = useState("");
    const [quizConfig, setQuizConfig] = useState<any>(QUIZ_CONFIG_INITIAL);
    const [received, setReceived] = useState<any>(false);
    const [questions, setQuestions] = useState("");
    const [choices, setChoices] = useState("");
    const [key, setKey] = useState("");
    const { complete, completion, setCompletion, isLoading } = useCompletion({
        api: "/api/standardQuiz",
    });

    const submitContent = useCallback(
        async (config: any) => {
            const completion = await complete(config);

            if (!completion) throw new Error("Completion didn't work");
            console.log("string version:");
            console.log(completion);
            const compList = completion.split(/\r?\n/);
            const cutCompList = compList.slice(1, compList.length - 1);

            const completionObj = JSON.parse(cutCompList.join(""));

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
                                value={quizConfig.name}
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
                <>
                    <div>
                        <h1>{quizConfig.quizName}</h1>
                        <div>1. {questions[0]}</div>
                        <ul>
                            <li>{choices[0][0]}</li>
                            <li>{choices[0][1]}</li>
                            <li>{choices[0][2]}</li>
                        </ul>
                        <div>Answer: {key[0]}</div>
                    </div>
                    <div>{questions}</div>
                    <div>{choices}</div>
                    <div>{key}</div>
                </>
            )}
        </div>
    );
}
