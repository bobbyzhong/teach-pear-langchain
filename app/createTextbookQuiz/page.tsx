"use client";
import { LargeInputBox, InputBox, SelectBox } from "@/components/Inputs";
import QuestionItem from "@/components/QuestionItem";
import Link from "next/link";
import { useState } from "react";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

const QUIZ_CONFIG_INITIAL = {
    numQuestions: "1",
    difficulty: "easy",
    quizName: "",
    textbook: "",
    concepts: "",
    className: "",
    chapters: "",
};

const NEW_QUESTION_INITIAL = {
    question: "",
    a: "",
    b: "",
    c: "",
    answer: "",
};

export default function PineconePage() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const [quizConfig, setQuizConfig] = useState<any>(QUIZ_CONFIG_INITIAL);
    const [received, setReceived] = useState<any>(false);
    const [questions, setQuestions] = useState<any>([]);
    const [choices, setChoices] = useState<any>([[]]);
    const [newQuestion, setNewQuestion] = useState<any>(NEW_QUESTION_INITIAL);
    const [key, setKey] = useState<any>([]);

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
        if (!config) return;
        setResult("");
        setLoading(true);
        try {
            const res = await fetch("/api/textbookQuiz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    numQuestions: quizConfig.numQuestions,
                    difficulty: quizConfig.difficulty,
                    textbook: quizConfig.textbook,
                    concepts: quizConfig.concepts,
                    chapters: quizConfig.chapters,
                }),
            });
            const json = await res.json();
            const completion = json.data;
            console.log("STRING VERSION");
            console.log(completion);
            const completionObj = JSON.parse(completion);
            setLoading(false);
            setQuestions(completionObj.questions);
            setChoices(completionObj.choices);
            setKey(completionObj.answers);
            setReceived(true);
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

    const handleAddQuestion = (e: any) => {
        setNewQuestion((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
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

    const addQuestion = () => {
        setQuestions([...questions, newQuestion.question]);
        setChoices([...choices, [newQuestion.a, newQuestion.b, newQuestion.c]]);
        setKey([...key, newQuestion.answer]);
    };

    const requestQuiz = () => {
        let quizString = JSON.stringify(quizConfig);
        console.log(quizString);
        sendQuery(quizString);
    };
    const componentRef = useRef(null);

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
                <div className="flex flex-row gap-16 h-[32rem] px-24">
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
                                        "",
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
                                <InputBox
                                    label="Chapter Number"
                                    name="chapters"
                                    placeholder="1, 2, 3"
                                    type="text"
                                    value={quizConfig.chapters}
                                    handleChange={handleChange}
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
                        <div className="flex flex-row gap-10">
                            <div className="bg-[#fefefe] px-12 py-8 rounded-xl w-1/2 ml-16 space-y-14">
                                {questions.map((question: any, index: any) => (
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
                                        {key.map((answer: any, index: any) => (
                                            <div key={answer + index}>
                                                {answer}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[#fefefe] px-12 py-8 rounded-xl w-1/2 mr-16 space-y-14">
                                <h1>Add Question</h1>
                                <div>
                                    <InputBox
                                        label="Question"
                                        name="question"
                                        placeholder="Who were part of the Allies in WW2"
                                        type="text"
                                        value={newQuestion.question}
                                        handleChange={handleAddQuestion}
                                    />
                                    <InputBox
                                        label="Choice A"
                                        name="a"
                                        placeholder="Japan"
                                        type="text"
                                        value={newQuestion.a}
                                        handleChange={handleAddQuestion}
                                    />
                                    <InputBox
                                        label="Choice B"
                                        name="b"
                                        placeholder="Britain"
                                        type="text"
                                        value={newQuestion.b}
                                        handleChange={handleAddQuestion}
                                    />
                                    <InputBox
                                        label="Choice C"
                                        name="c"
                                        placeholder="Italy"
                                        type="text"
                                        value={newQuestion.c}
                                        handleChange={handleAddQuestion}
                                    />
                                    <InputBox
                                        label="Answer"
                                        name="answer"
                                        placeholder="b"
                                        type="text"
                                        value={newQuestion.answer}
                                        handleChange={handleAddQuestion}
                                    />
                                    <button onClick={addQuestion}>
                                        Add question
                                    </button>
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
                            {questions.map((question: any, index: any) => (
                                <div
                                    key={index + question}
                                    className="px-8 mb-3"
                                >
                                    <h1>
                                        {index + 1}. {question}
                                    </h1>
                                    <div className="ml-5 ">
                                        {/* <div>{choices[index]}</div> */}
                                        {choices[index].map(
                                            (choice: any, index: any) => (
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
    );
}
