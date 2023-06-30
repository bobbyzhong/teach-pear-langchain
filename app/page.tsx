"use client";

import { useCompletion } from "ai/react";
import { useState, useEffect, useCallback } from "react";
import { InputBox, LargeInputBox, SelectBox } from "@/components/Inputs";

const QUIZ_CONFIG_INITIAL = {
    content: "",
    numQuestions: "3",
    questionType: "multiple choice",
};

const QUIZ_INFO_INITIAL = {
    quizName: "",
};

export default function PostEditorPage() {
    // Locally store our blog posts content
    const [content, setContent] = useState("");
    const [quizConfig, setQuizConfig] = useState<any>(QUIZ_CONFIG_INITIAL);
    const [quizInfo, setQuizInfo] = useState<any>(QUIZ_INFO_INITIAL);
    const [questions, setQuestions] = useState("");
    const [choices, setChoices] = useState("");
    const [key, setKey] = useState("");
    const { complete, completion, setCompletion, isLoading } = useCompletion({
        api: "/api/chat",
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
        },
        [complete]
    );

    const handleChange = (e: any) => {
        setQuizConfig((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleChange2 = (e: any) => {
        setQuizInfo((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const requestQuiz = () => {
        let quizString = JSON.stringify(quizConfig);
        submitContent(quizString);
    };

    return (
        <div className="px-10">
            <h1>Post Editor</h1>
            <div className="w-1/2">
                <LargeInputBox
                    label="Content"
                    name="content"
                    placeholder=""
                    type="text"
                    value={quizConfig.content}
                    handleChange={handleChange}
                />
                <InputBox
                    label="Quiz Name"
                    name="quizName"
                    placeholder="AP Euro Quiz 2"
                    type="text"
                    value={quizInfo.name}
                    handleChange={handleChange2}
                />
                <SelectBox
                    placeholder="Number of Questions"
                    options={["1", "2", "3", "4", "5"]}
                    handleChange={handleChange}
                    statusCompleted={quizConfig.numQuestions ? true : false}
                    label="Number of Questions"
                    name="numQuestions"
                />
                <SelectBox
                    placeholder="Question Type"
                    options={["Multiple Choice", "Free Response"]}
                    handleChange={handleChange}
                    statusCompleted={quizConfig.questionType ? true : false}
                    label="Question Type"
                    name="questionType"
                />
            </div>

            <button onClick={requestQuiz}>Publish</button>
            {isLoading ? (
                <div>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <>
                    <div>{questions}</div>
                    <div>{choices}</div>
                    <div>{key}</div>
                </>
            )}
        </div>
    );
}
