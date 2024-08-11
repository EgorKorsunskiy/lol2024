import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PROBLEMS } from "../constatns/problems";
import { Input, Button } from "@headlessui/react";

function ProblemPage() {
    const [answerValue, setAnswerValue] = useState("");
    const [solved, setSolved] = useState(false);
    const [failed, setFailed] = useState(false);
    const navigate = useNavigate();
    const { tabId, problemId } = useParams();
    const currentProblem = useMemo(
        () => PROBLEMS[tabId].levels[problemId],
        [tabId, problemId]
    );

    const addCoins = async () => {
        
    }

    const handleClick = async () => {
        setFailed(false)
        setSolved(false)
        if (!answerValue) return;
        if (answerValue == currentProblem.answer) {
            setSolved(true);

        } else {
            setFailed(true);
        }
    };

    const getColor = () => {
        if (solved) return "text-lime-500";
        else if (failed) return "text-red-600";
    };

    return (
        <>
            <Button
                onClick={() => navigate("/")}
                className="bg-indigo-500 h-10 w-28 rounded-md mb-6 absolute left-6 top-6"
            >
                <p className="font-mono text-white">Main page</p>
            </Button>
            <div className="p-8 px-72 flex justify-center flex-col gap-6 items-center mt-12">
                <h1 className="font-mono text-3xl">Problem</h1>
                <p className="font-mono text-lg">{currentProblem?.content}</p>
                <h2 className="font-mono text-2xl mt-10">
                    Your answer ({PROBLEMS[tabId].reward})
                </h2>
                <div className="w-full">
                    <Input
                        value={answerValue}
                        onChange={(e) => setAnswerValue(e.target.value)}
                        className={
                            "mt-1 block w-full rounded-lg border-2 border-indigo-500 py-1.5 px-3"
                        }
                        placeholder="Answer"
                    />
                </div>
                <Button
                    className="bg-indigo-500 h-10 w-28 rounded-md -mt-2"
                    onClick={handleClick}
                >
                    <p className="font-mono text-white">Submit</p>
                </Button>
                {solved && (
                    <div className="flex flex-col">
                        <h4 className={`font-mono text-lg text-center ${getColor()}`}>
                            OK
                        </h4>
                        <p className={`font-mono text-lg ${getColor()}`}>
                            +{PROBLEMS[tabId].reward} coins
                        </p>
                    </div>
                )}
                {failed && (
                    <div className="flex flex-col">
                        <h4 className={`font-mono text-lg text-center ${getColor()}`}>
                            WA
                        </h4>
                        <p className={`font-mono text-lg ${getColor()}`}>
                            You were too stupid :(
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProblemPage;
