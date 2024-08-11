import React from "react";

function ProblemView({ index, reward }) {

    return (
        <div className="relative shadow-lg p-6 border-2 border-black h-18 cursor-pointer">
            <div className="flex  justify-between items-center">
                <p className="font-mono text-md">Problem {index}</p>
                <p className="font-mono text-md">Reward {reward}</p>
            </div>
        </div>
    );
}

export default ProblemView;
