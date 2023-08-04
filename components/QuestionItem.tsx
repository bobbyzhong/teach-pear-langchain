import { useState } from "react";
import Image from "next/image";

export default function QuestionItem({
    question,
    choices,
    answer,
    currIndex,
    onChange,
}: {
    question: any;
    choices: any;
    answer: any;
    currIndex: any;
    onChange: any;
}) {
    const [editedQuestion, setEditedQuestion] = useState(question);
    const [editedChoices, setEditedChoices] = useState([...choices]);
    const [editedAnswer, setEditedAnswer] = useState(answer);
    const [editedIndex, setEditedIndex] = useState(currIndex);

    const handleSave = () => {
        onChange(editedQuestion, editedChoices, editedAnswer, editedIndex);
    };

    const handleEditChoice = (e: any, index: any) => {
        const newChoices = [...editedChoices];
        newChoices[index] = e.target.value;
        setEditedChoices(newChoices);
    };

    return (
        <div>
            <div className="flex flex-col mb-3">
                <label className="mb-1 ">
                    <span className="font-light text-zinc-500 text-[17px]">
                        Question {currIndex + 1}.
                    </span>
                </label>
                <input
                    className="font-[450]  bg-white1 text-zinc-900 tracking-tight"
                    type="text"
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                />
            </div>

            <div className="flex flex-col text-[15px] space-y-2 ml-5 mb-2">
                {editedChoices.map((choice, index) => (
                    <div key={choice + index} className="">
                        <input
                            key={index}
                            type="text"
                            value={choice}
                            onChange={(e) => handleEditChoice(e, index)}
                            className="w-full bg-white1"
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-row ml-5 mt-6 w-full tracking-tight justify-between">
                {" "}
                <div className="flex flex-row items-center">
                    <h1>
                        <span className="font-semibold">Answer</span>:{" "}
                    </h1>

                    <input
                        className="ml-1 bg-white1"
                        type="text"
                        value={editedAnswer}
                        onChange={(e) => setEditedAnswer(e.target.value)}
                    />
                </div>
                <button
                    className="font-semibold items-center  gap-3 flex flex-row"
                    onClick={handleSave}
                >
                    <h1>Save Changes</h1>
                    <Image
                        src={"assets/icons/save.svg"}
                        height={25}
                        width={25}
                        alt={""}
                        className="mr-6"
                    />
                </button>
            </div>
        </div>
    );
}
