import { useState } from "react";

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

    return (
        <div>
            <div className="flex flex-col mb-3">
                <label className="mb-1 ">
                    <span className="font-semibold text-zinc-800 text-xl">
                        Question {currIndex + 1}.
                    </span>
                </label>
                <input
                    className="px-1 w-content"
                    type="text"
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                />
            </div>

            <div className="flex flex-col  ml-1 mb-3">
                {editedChoices.map((choice, index) => (
                    <div key={choice + index} className="">
                        <input
                            key={index}
                            type="text"
                            value={choice}
                            onChange={(e) => {
                                const newChoices = [...editedChoices];
                                newChoices[index] = e.target.value;
                                setEditedChoices(newChoices);
                            }}
                            className="w-full"
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-row ml-1 mt-6">
                {" "}
                <div className="flex flex-row">
                    <h1>
                        <b>Answer</b>:{" "}
                    </h1>

                    <input
                        className="ml-1"
                        type="text"
                        value={editedAnswer}
                        onChange={(e) => setEditedAnswer(e.target.value)}
                    />
                </div>
                <button className="font-bold" onClick={handleSave}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}
