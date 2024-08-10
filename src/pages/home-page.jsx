import React from "react";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate()

    return (
        <div className="mt-48">
            <div className="flex justify-center">
                <h1 className="font-mono text-[6rem]">LOL 2024</h1>
            </div>
            <div className="mt-[12rem] flex justify-center">
                <div className="flex gap-6 flex-col">
                    <Button className="h-12 w-96 rounded bg-[#9db6cc]" onClick={() => navigate('/study')}>
                        <h2 className="text-white font-mono text-md">Study</h2>
                    </Button>
                    <Button className="h-12 w-96 rounded bg-[#397896]" onClick={() => navigate('/communication')}>
                        <h2 className="text-white font-mono">Communication</h2>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
