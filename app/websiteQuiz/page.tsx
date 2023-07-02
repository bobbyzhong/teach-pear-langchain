"use client";

import { useCompletion } from "ai/react";
import { InputBox, LargeInputBox } from "@/components/Inputs";
import { useState, useEffect, useCallback } from "react";

const SIMP_CONFIG_INITIAL = {
    website: "",
};

export default function Completion() {
    const [quizConfig, setQuizConfig] = useState<any>(SIMP_CONFIG_INITIAL);
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        // const res = await fetch("/api/websiteQuiz", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         query: quizConfig.website,
        //         history: [],
        //     }),
        // });
        // const responseData = await res.json();
        const responseStr = `{
  output: '{\n  "type": "object",\n  "properties": {\n    "questions": {\n      "type": "string",\n      "description": "list containing every question. Ex: [Question 1, Question 2, Question 3]"\n    },\n    "choices": {\n      "type": "string",\n      "description": "list containing a list for each question\'s 3 possible answer choices"\n    },\n    "answers": {\n      "type": "string",\n      "description": "list containing letters to each question\'s correct letter answer"\n    }\n  },\n  "required'
}`;
        setLoading(false);
        console.log(responseStr);
    };

    const handleChange = (e: any) => {
        setQuizConfig((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        console.log(quizConfig.website);
    };

    return (
        <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
            <div>Quiz with a website URL</div>
            <LargeInputBox
                label="Content"
                name="website"
                placeholder=""
                type="text"
                value={quizConfig.content}
                handleChange={handleChange}
            />
            <div className="flex flex-row gap-5">
                {" "}
                <button onClick={handleSubmit} type="submit">
                    Submit
                </button>
            </div>

            <div>
                {loading ? (
                    <div>Loading</div>
                ) : (
                    <div>
                        <p>Result</p>
                    </div>
                )}
            </div>
        </div>
    );
}
