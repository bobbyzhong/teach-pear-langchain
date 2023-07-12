"use client";

import { useCompletion } from "ai/react";
import { InputBox, LargeInputBox } from "@/components/Inputs";
import { useState, useEffect, useCallback } from "react";

const SIMP_CONFIG_INITIAL = {
    content: "",
};

export default function Completion() {
    const [simpConfig, setSimpConfig] = useState<any>(SIMP_CONFIG_INITIAL);
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/file-summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: simpConfig.content,
                history: [],
            }),
        });
        const responseData = await res.json();
        setLoading(false);
        setResult(responseData.res);
        console.log(result);
    };

    const handleChange = (e: any) => {
        setSimpConfig((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
            <div>File Summarize</div>
            <LargeInputBox
                label="Content"
                name="content"
                placeholder=""
                type="text"
                value={simpConfig.content}
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
                        <p>Result {result}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
