"use client";

import { useCompletion } from "ai/react";
import { useState, useEffect, useCallback } from "react";
import { InputBox, LargeInputBox, SelectBox } from "@/components/Inputs";
import ReactToPrint from "react-to-print";
import QuestionItem from "@/components/QuestionItem";
import { useRef } from "react";
import Link from "next/link";
import supabase from "../app/supabase-browser";
import { useRouter } from "next/navigation";

import DashNav from "./DashNav";
import VertNav from "./VertNav";

const USER_DATA_INITIAL_STATE = {
    user_id: "",
    email: "",
    f_name: "",
    l_name: "",
    school: "",
    students: [],
};

const QUIZ_CONFIG_INITIAL = {
    content: "",
    numQuestions: "1",
    difficulty: "easy",
    quizName: "Quiz Name",
};

export function CreateStandardQuiz(user: any) {
    const [quizConfig, setQuizConfig] = useState<any>(QUIZ_CONFIG_INITIAL);
    const [received, setReceived] = useState<any>(false);
    const [questions, setQuestions] = useState([]);
    const [userData, setUserData] = useState<any>(USER_DATA_INITIAL_STATE);

    const [choices, setChoices] = useState([[]]);
    const [key, setKey] = useState([]);
    const [loading, setLoading] = useState<any>(false);
    const { complete, completion, setCompletion, isLoading } = useCompletion({
        api: "/api/standardQuiz",
    });
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data: userInfo } = await supabase
                .from("teachers")
                .select("*")
                .eq("user_id", user.user.id);

            if (userInfo?.length === 0 || userInfo === null) {
                console.log("NOT ONBOARDED");
            } else {
                setUserData(userInfo);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const testObj = `{
  "questions": [
    "What is the largest species of penguin?",
    "How tall is the smallest species of penguin?",
    "How many penguin species live exclusively on the Antarctic continent?",
    "Where do Humboldt penguins live?",
    "Where do yellow-eyed penguins burrow?"
  ],
  "choices": [
    ["A. Emperor", "B. Adélie", "C. Fairy"],
    ["A. 4 foot, 5 inches", "B. 1 foot", "C. 5 feet"],
    ["A. 2", "B. 5", "C. 10"],
    ["A. Atacama Desert", "B. Enderby Island", "C. Antarctic continent"],
    ["A. Atacama Desert", "B. Enderby Island", "C. Dwarf rata forests"]
  ],
  "answers": ["A", "B", "A", "A", "C"]
}`;

    const handleSubmit = async (e: any) => {
        setLoading(true);
        // const res = await fetch("/api/standardQuiz", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         numQuestions: quizConfig.numQuestions,
        //         difficulty: quizConfig.difficulty,
        //         content: quizConfig.content,
        //     }),
        // });
        // const responseData = await res.json();
        // const completion = responseData.res;
        // console.log("STRING VERSION");
        // console.log(completion);
        const completionObj = JSON.parse(testObj);
        setLoading(false);
        setQuestions(completionObj.questions);
        setChoices(completionObj.choices);
        setKey(completionObj.answers);
        setReceived(true);
    };
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
        handleSubmit(quizString);
    };

    const componentRef = useRef(null);
    return (
        <div>
            {userData.length > 0 && (
                <div className="absolute w-full">
                    <DashNav
                        title={"Create Standard Quiz"}
                        bio={
                            "Create a quiz based on plain text provided by yourself!"
                        }
                        userInfo={userData}
                    />
                </div>
            )}
            <div className="MAIN CONTAINER bg-gray1  flex flex-row">
                <VertNav />
                {/* Title */}

                <div className="w-full mt-10 pt-[5.5rem]">
                    <div className="flex flex-row gap-10 h-[30.6rem] px-10">
                        <div className="w-7/12  ">
                            <LargeInputBox
                                label=""
                                name="content"
                                placeholder="Paste your content here"
                                type="text"
                                value={quizConfig.content}
                                handleChange={handleChange}
                                rows={19}
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
                                Note: You can edit all the questions, choices,
                                and answers by just clicking on them and typing
                                it yourself. Below this you will have the option
                                to either share the quiz with your students as a
                                link or print it out
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
                                    <h1 className="font-semibold">
                                        Answer Key:
                                    </h1>
                                    <div className="flex flex-row space-x-1">
                                        {key.map((answer, index) => (
                                            <div key={answer + index}>
                                                {answer}
                                            </div>
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

                        <h1 className="text-2xl mb-1 font-medium">
                            Print Preview
                        </h1>

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
                                            {choices[index].map(
                                                (choice, index) => (
                                                    <div key={choice + index}>
                                                        {choice}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
