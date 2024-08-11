import React from "react";
import coffeeIcon from "../../images/coffee-icon.png"

function ProblemView({ index, reward }) {

    return (
        <div className="relative bg-[#81ACAB] p-4 h-18 cursor-pointer rounded-lg">
            <div className="flex  justify-between items-center">
                <p className="font-mono text-xl font-bold">PROBLEM {index}</p>
                {/* <p className="font-mono text-md">Reward {reward}</p> */}
                <div className="flex gap-2">
                    {Array.from(Array(5).keys()).map((_, index) => (
                        <img src={coffeeIcon} className={`h-14 w-14 ${index <= (reward-1) ? "" : "opacity-30"}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProblemView;
