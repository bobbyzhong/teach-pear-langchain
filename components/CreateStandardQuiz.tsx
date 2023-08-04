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
import Image from "next/image";
import DashNav from "./DashNav";
import VertNav from "./VertNav";
import { request } from "http";

const USER_DATA_INITIAL_STATE = {
    user_id: "",
    email: "",
    f_name: "",
    l_name: "",
    school: "",
    students: [],
};

const NEW_QUESTION_INITIAL = {
    question: "",
    a: "A. ",
    b: "B. ",
    c: "C. ",
    d: "D. ",
    answer: "",
};

const QUIZ_CONFIG_INITIAL = {
    content: "",
    numQuestions: "1",
    difficulty: "easy",
    quizName: "Quiz Name",
    className: "",
    version: "A",
};

export function CreateStandardQuiz(user: any) {
    const [quizConfig, setQuizConfig] = useState<any>(QUIZ_CONFIG_INITIAL);
    const [received, setReceived] = useState<any>(false);
    const [questions, setQuestions] = useState<any>([]);
    const [choices, setChoices] = useState<any>([[]]);
    const [newQuestion, setNewQuestion] = useState<any>(NEW_QUESTION_INITIAL);
    const [key, setKey] = useState<any>([]);
    const [userData, setUserData] = useState<any>(USER_DATA_INITIAL_STATE);
    const [showEdit, setShowEdit] = useState<any>(false);
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

    const handleAddQuestion = (e: any) => {
        setNewQuestion((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const addQuestion = () => {
        setQuestions([...questions, newQuestion.question]);
        setChoices([...choices, [newQuestion.a, newQuestion.b, newQuestion.c]]);
        setKey([...key, newQuestion.answer]);
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

    useEffect(() => {
        document.body.style.overflow = "scroll";
    }, []);

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
                <div className="flex flex-col w-full">
                    <div className="w-full mt-10 pt-[4rem]">
                        <div className="flex flex-row gap-5 h-[33.8rem] px-5">
                            <div className="w-7/12  ">
                                <LargeInputBox
                                    label=""
                                    name="content"
                                    placeholder="Paste your content here"
                                    type="text"
                                    value={quizConfig.content}
                                    handleChange={handleChange}
                                    rows={21}
                                    className="shadow-md"
                                />
                            </div>
                            <div className="w-5/12 flex flex-col justify-between bg-white1 shadow-md  py-5 px-7 rounded-xl ">
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-lg font-semibold border-b-[1.5px] tracking-tight border-gray">
                                        Quiz Settings
                                    </h1>

                                    <InputBox
                                        label="Quiz Name"
                                        name="quizName"
                                        placeholder="AP Euro Quiz 2"
                                        type="text"
                                        value={quizConfig.quizName}
                                        handleChange={handleChange}
                                    />
                                    <InputBox
                                        label="Class Name"
                                        name="className"
                                        placeholder="AP European History"
                                        type="text"
                                        value={quizConfig.className}
                                        handleChange={handleChange}
                                    />
                                    <InputBox
                                        label="Version"
                                        name="version"
                                        placeholder="A"
                                        type="text"
                                        value={quizConfig.version}
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
                                            quizConfig.numQuestions
                                                ? true
                                                : false
                                        }
                                        label="Number of Questions"
                                        name="numQuestions"
                                    />
                                    <SelectBox
                                        placeholder="Easy"
                                        options={["Easy", "Medium", "Hard"]}
                                        handleChange={handleChange}
                                        statusCompleted={
                                            quizConfig.numQuestions
                                                ? true
                                                : false
                                        }
                                        label="Difficulty Level"
                                        name="difficulty"
                                    />
                                </div>
                                {loading ? (
                                    <div>
                                        <h1>
                                            Generating quiz. Might take up to 30
                                            seconds...
                                        </h1>
                                    </div>
                                ) : (
                                    <div
                                        onClick={requestQuiz}
                                        className=" flex flex-col w-full  bg-green hover:bg-green2   mt-5 font-medium tracking-tight 
                                        rounded-[5px] px-[35px] my-0 py-[10px]
                                     text-center text-white1 cursor-pointer"
                                    >
                                        Generate Quiz
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {!received ? (
                        <></>
                    ) : (
                        <div className="px-8 mt-10">
                            {/* RAW SECTION */}
                            {showEdit ? (
                                <div className="mb-10">
                                    <Image
                                        src={"assets/icons/edit.svg"}
                                        height={50}
                                        width={50}
                                        alt={""}
                                    />
                                    <h1 className="text-2xl mb-1 mt-2 font-semibold tracking-tight">
                                        Quiz Editor
                                    </h1>
                                    <p className="w-9/12 mb-5 text-zinc-500 font-light ">
                                        Below you’ll be able to double check the
                                        content generated and make all the
                                        changes you want. To make changes just
                                        click on the text and type it yourself.
                                        Don’t forget to save any changes you
                                        made!
                                    </p>
                                    <div
                                        onClick={() => setShowEdit(false)}
                                        className="flex mb-5 flex-row gap-2 items-center cursor-pointer"
                                    >
                                        <Image
                                            src={"/assets/icons/greenStar.svg"}
                                            height={35}
                                            width={35}
                                            alt=""
                                        />
                                        <h1 className="font-medium underline underline-offset-2">
                                            Back to Quiz Preview
                                        </h1>
                                    </div>
                                    {/* TOP BAR */}
                                    <div className="flex flex-row gap-3">
                                        <div
                                            className="w-1/3 flex flex-col text-start bg-white1 border-[1.5px] max-w-sm 
             border-gray2 p-3 rounded-md"
                                        >
                                            <div>
                                                <h1 className="text-[15px] font-medium tracking-tight text-zinc-500">
                                                    Title
                                                </h1>
                                                <input
                                                    className="leading-[1.5rem] text-[16.5px] font-[550] text-zinc-900"
                                                    value={quizConfig.quizName}
                                                    placeholder={"Quiz name"}
                                                    onChange={handleChange}
                                                    name={"quizName"}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="w-1/3 flex flex-col text-start bg-white1 border-[1.5px] max-w-sm 
             border-gray2 p-3 rounded-md"
                                        >
                                            <div>
                                                <h1 className="text-[15px] font-medium tracking-tight text-zinc-500">
                                                    Answer Key
                                                </h1>
                                                <div className="flex flex-row font-[550] space-x-1">
                                                    {key.map(
                                                        (
                                                            answer: any,
                                                            index: any
                                                        ) => (
                                                            <div
                                                                key={
                                                                    answer +
                                                                    index
                                                                }
                                                            >
                                                                {answer}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="w-1/12 flex flex-col text-start bg-white1 border-[1.5px] max-w-sm 
             border-gray2 p-3 rounded-md"
                                        >
                                            <div>
                                                <h1 className="text-[15px] font-medium tracking-tight text-zinc-500">
                                                    Version
                                                </h1>
                                                <input
                                                    className="leading-[1.5rem] text-[16.5px] w-1/2 font-[550] text-zinc-900"
                                                    value={quizConfig.version}
                                                    placeholder={"Version"}
                                                    onChange={handleChange}
                                                    name={"version"}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="w-3/12 flex flex-col text-start bg-white1 border-[1.5px] max-w-sm 
             border-gray2 p-3 rounded-md"
                                        >
                                            <div>
                                                <h1 className="text-[15px] font-medium tracking-tight text-zinc-500">
                                                    Class Name
                                                </h1>
                                                <input
                                                    className="leading-[1.5rem]  text-[16.5px] font-[550] text-zinc-900"
                                                    value={quizConfig.className}
                                                    placeholder={
                                                        "AP US History"
                                                    }
                                                    onChange={handleChange}
                                                    name={"className"}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-4 mt-3">
                                        <div className="bg-white1 p-5 rounded-md border-[1.5px] border-gray2 w-2/3 ">
                                            <h1 className="text-[15px] font-medium tracking-tight text-zinc-500 mb-5">
                                                Current Quiz
                                            </h1>
                                            <div className="flex flex-col space-y-8">
                                                {" "}
                                                {questions.map(
                                                    (
                                                        question: any,
                                                        index: any
                                                    ) => (
                                                        <div
                                                            key={
                                                                index + question
                                                            }
                                                        >
                                                            <QuestionItem
                                                                key={index}
                                                                question={
                                                                    question
                                                                }
                                                                choices={
                                                                    choices[
                                                                        index
                                                                    ]
                                                                }
                                                                answer={
                                                                    key[index]
                                                                }
                                                                onChange={
                                                                    handleQuestionChange
                                                                }
                                                                currIndex={
                                                                    index
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        {/* ADD QUESTION COMPONENT */}
                                        <div className="bg-white1 border-[1.5px] border-gray2 p-5 rounded-md w-1/3 h-fit space-y-8">
                                            <h1 className="text-[15px] font-medium tracking-tight text-zinc-500 mb-5">
                                                Add Question
                                            </h1>
                                            <div>
                                                <InputBox
                                                    label="Question"
                                                    name="question"
                                                    placeholder="Who were part of the Allies in WW2"
                                                    type="text"
                                                    value={newQuestion.question}
                                                    handleChange={
                                                        handleAddQuestion
                                                    }
                                                />
                                                <InputBox
                                                    label="Choice A"
                                                    name="a"
                                                    placeholder="Japan"
                                                    type="text"
                                                    value={newQuestion.a}
                                                    handleChange={
                                                        handleAddQuestion
                                                    }
                                                />
                                                <InputBox
                                                    label="Choice B"
                                                    name="b"
                                                    placeholder="Britain"
                                                    type="text"
                                                    value={newQuestion.b}
                                                    handleChange={
                                                        handleAddQuestion
                                                    }
                                                />
                                                <InputBox
                                                    label="Choice C"
                                                    name="c"
                                                    placeholder="Italy"
                                                    type="text"
                                                    value={newQuestion.c}
                                                    handleChange={
                                                        handleAddQuestion
                                                    }
                                                />
                                                <InputBox
                                                    label="Choice D"
                                                    name="d"
                                                    placeholder="Croatia"
                                                    type="text"
                                                    value={newQuestion.d}
                                                    handleChange={
                                                        handleAddQuestion
                                                    }
                                                />
                                                <InputBox
                                                    label="Answer"
                                                    name="answer"
                                                    placeholder="b"
                                                    type="text"
                                                    value={newQuestion.answer}
                                                    handleChange={
                                                        handleAddQuestion
                                                    }
                                                />

                                                <div
                                                    onClick={addQuestion}
                                                    className=" flex flex-col w-full  bg-green hover:bg-green2   mt-5 font-medium tracking-tight 
                                        rounded-[5px] px-[35px] my-0 py-[10px]
                                     text-center text-white1 cursor-pointer"
                                                >
                                                    Add Question
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => setShowEdit(false)}
                                        className="flex  my-5 flex-row gap-2 items-center cursor-pointer"
                                    >
                                        <Image
                                            src={"/assets/icons/greenStar.svg"}
                                            height={35}
                                            width={35}
                                            alt=""
                                        />
                                        <h1 className="font-medium underline underline-offset-2">
                                            Back to Quiz Preview
                                        </h1>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-10">
                                        <Image
                                            src={"assets/icons/greenstar.svg"}
                                            height={50}
                                            width={50}
                                            alt={""}
                                        />
                                        <h1 className="text-2xl mb-1 mt-2 font-semibold tracking-tight">
                                            Your Quiz
                                        </h1>
                                        <p className="w-9/12 mb-5 text-zinc-500 font-light ">
                                            Below you’ll have the option to{" "}
                                            <b className="text-black">edit</b>,
                                            <b className="text-black">print</b>{" "}
                                            or{" "}
                                            <b className="text-black">share</b>{" "}
                                            the quiz.
                                        </p>
                                        <div className="flex gap-8">
                                            <div
                                                onClick={() =>
                                                    setShowEdit(true)
                                                }
                                                className="flex flex-row gap-2 items-center cursor-pointer"
                                            >
                                                <Image
                                                    src={
                                                        "/assets/icons/edit.svg"
                                                    }
                                                    height={35}
                                                    width={35}
                                                    alt=""
                                                />
                                                <h1 className="font-medium underline underline-offset-2">
                                                    Edit Quiz
                                                </h1>
                                            </div>
                                            <div className="">
                                                <ReactToPrint
                                                    trigger={() => {
                                                        return (
                                                            <a
                                                                className="font-medium flex flex-row gap-2 items-center"
                                                                href="#"
                                                            >
                                                                <Image
                                                                    src={
                                                                        "/assets/icons/printer.svg"
                                                                    }
                                                                    height={35}
                                                                    width={35}
                                                                    alt=""
                                                                />
                                                                <h1 className="underline underline-offset-2">
                                                                    Print Quiz
                                                                </h1>
                                                            </a>
                                                        );
                                                    }}
                                                    content={() =>
                                                        componentRef.current
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-row gap-2 items-center">
                                                <Image
                                                    src={
                                                        "/assets/icons/sharelink.svg"
                                                    }
                                                    height={35}
                                                    width={35}
                                                    alt=""
                                                />
                                                <h1 className="font-medium underline underline-offset-2">
                                                    Share as Link
                                                </h1>
                                            </div>
                                        </div>
                                    </div>

                                    {/* PRINT SECTION */}

                                    <h1 className="text-2xl mb-5 mt-2 font-semibold tracking-tight">
                                        Print Preview
                                    </h1>

                                    <div className="px-16 rounded-md mb-10">
                                        <div
                                            ref={componentRef}
                                            className="bg-white1 px-12 py-8 rounded-md font-tinos  min-h-[60rem]"
                                        >
                                            {/* HEADER SECTION */}
                                            <div className="flex flex-row justify-between font-semibold ">
                                                <h1 className="w-1/3">Name:</h1>
                                                <h1 className="w-1/3 text-center ">
                                                    {quizConfig.className}
                                                </h1>
                                                <h1 className="w-1/3 text-center">
                                                    Version:{" "}
                                                    {quizConfig.version}
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
                                                Identify the choice that best
                                                completes the statement or
                                                answers the question
                                            </div>

                                            {/* QUESTIONS */}
                                            {questions.map(
                                                (question: any, index: any) => (
                                                    <div
                                                        key={index + question}
                                                        className="px-8 mb-3"
                                                    >
                                                        <h1>
                                                            {index + 1}.{" "}
                                                            {question}
                                                        </h1>
                                                        <div className="ml-5 ">
                                                            {choices[index].map(
                                                                (
                                                                    choice: any,
                                                                    index: any
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            choice +
                                                                            index
                                                                        }
                                                                    >
                                                                        {choice}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
