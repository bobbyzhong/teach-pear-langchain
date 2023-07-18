"use client";

import { useCompletion } from "ai/react";
import { useState, useEffect, useCallback } from "react";
import { InputBox, LargeInputBox, SelectBox } from "@/components/Inputs";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import QuestionItem from "@/components/QuestionItem";
import { useRef } from "react";
import Link from "next/link";

const QUIZ_CONFIG_INITIAL = {
    content: "",
    numQuestions: "3",
    difficulty: "easy",
    quizName: "Quiz Name",
};

export default function CreateQuiz() {
    const [quizConfig, setQuizConfig] = useState<any>(QUIZ_CONFIG_INITIAL);
    const [received, setReceived] = useState<any>(false);
    const [questions, setQuestions] = useState([]);
    const [choices, setChoices] = useState([[]]);
    const [key, setKey] = useState([]);
    const { complete, completion, setCompletion, isLoading } = useCompletion({
        api: "/api/standardQuiz",
    });

    const testObj = `json\n
{
  "questions": [
    "What does the report suggest about the current marine park around Macquarie Island?",
    "According to the report, what is the most sensible approach for protecting the area's unique ecosystems?",
    "What are the main direct human impacts in the area?",
    "What is the target of the current fishery in the central zone of the Macquarie Ridge?",
    "What would be precluded under the proposed protection zones?"
  ],
  "choices": [
    ["A. It adequately represents the entire area around Macquarie Island.", "B. It protects the entire Macquarie Ridge.", "C. It does not adequately protect certain areas around Macquarie Island."],
    ["A. Declaring the entire area around the Macquarie Ridge as a marine park.", "B. Expanding the current sanctuary zone.", "C. Completely banning fishing in the area."],
    ["A. Fishing and marine debris.", "B. Climate change and seabed mining.", "C. Fishing and climate change."],
    ["A. Patagonian toothfish.", "B. Midwater species.", "C. Seabirds and marine mammals."],
    ["A. Fishing and mining.", "B. Fishing and seabirds.", "C. Mining and marine mammals."]
  ],
  "answers": ["C", "A", "A", "A", "A"]
}\n
`;

    const submitContent = useCallback(
        async (config: any) => {
            const completion = await complete(config);

            if (!completion) throw new Error("Completion didn't work");
            // const completion = testObj;
            console.log("string version:");
            console.log(completion);
            const compList = completion.split(/\r?\n/);
            const cutCompList = compList.slice(1, compList.length - 2);
            console.log("cutCompList:");
            console.log(cutCompList);
            console.log("JOINED cutCompList:");
            console.log(cutCompList.join("").trim());

            const completionObj = JSON.parse(cutCompList.join("").trim());
            // const completionObj = JSON.parse(testObj);

            console.log(completionObj);

            setQuestions(completionObj.questions);
            setChoices(completionObj.choices);
            setKey(completionObj.answers);
            setReceived(true);
        },
        [complete]
    );
    const handleQuestionChange = (
        editedQuestion: never,
        editedChoices: never,
        editedAnswer: never,
        currIndex: number
    ) => {
        // Create a new array with the updated question, choices, and answer
        const newQuestions = [...questions];

        const newChoices = [...choices];
        const newAnswer = [...key];

        newQuestions[currIndex] = editedQuestion;
        newChoices[currIndex] = editedChoices;
        newAnswer[currIndex] = editedAnswer;

        setQuestions(newQuestions);
        setChoices(newChoices);
        setKey(newAnswer);
    };

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
                <Link href={"/demo"}>
                    <h1 className="font-outfit text-[2.1rem]">🍐 Pear</h1>
                </Link>

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
                            rows={18}
                            className="shadow-md"
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
                    {/* RAW SECTION */}
                    <div className="mb-10">
                        <h1 className="text-2xl mb-1 font-medium">
                            Quiz Editor
                        </h1>
                        <p className="w-6/12 mb-8">
                            Note: You can edit all the questions, choices, and
                            answers by just clicking on them and typing it
                            yourself. Below this you will have the option to
                            either share the quiz with your students as a link
                            or print it out
                        </p>
                        <div className="bg-[#fefefe] px-12 py-8 rounded-xl mx-16 space-y-14">
                            {questions.map((question, index) => (
                                <div key={index + question}>
                                    <QuestionItem
                                        key={index}
                                        question={question}
                                        choices={choices[index]}
                                        answer={key[index]}
                                        onChange={handleQuestionChange}
                                        currIndex={index}
                                    />
                                </div>
                            ))}
                            <div>
                                <h1 className="font-semibold">Answer Key:</h1>
                                <div className="flex flex-row space-x-1">
                                    {key.map((answer, index) => (
                                        <div key={answer + index}>{answer}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SHARE SECTION */}
                    <div className="mb-10">
                        <h1 className="text-2xl mb-1 font-medium">
                            Share Quiz
                        </h1>
                        <div className="flex gap-5">
                            <button
                                // onClick={handleSubmit}
                                className={`inline-block text-white tracking-wider text-center max-w-fit bg-black
        font-normal text-sm transition ease-in-out duration-100
      box-content hover:scale-105 my-0 px-[43px] py-[10px]`}
                            >
                                Share as link
                            </button>
                            <div
                                className={`inline-block text-white tracking-wider text-center max-w-fit bg-black
        font-normal text-sm transition ease-in-out duration-100
      box-content hover:scale-105 my-0 px-[43px] py-[10px]`}
                            >
                                <ReactToPrint
                                    trigger={() => {
                                        return <a href="#">Print it out</a>;
                                    }}
                                    content={() => componentRef.current}
                                />
                            </div>
                        </div>
                    </div>

                    {/* PRINT SECTION */}

                    <h1 className="text-2xl mb-1 font-medium">Print Preview</h1>

                    <div className="px-16 rounded-xl mb-10">
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
                                <div
                                    key={index + question}
                                    className="px-8 mb-3"
                                >
                                    <h1>
                                        {index + 1}. {question}
                                    </h1>
                                    <div className="ml-5 ">
                                        {choices[index].map((choice, index) => (
                                            <div key={choice + index}>
                                                {choice}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
