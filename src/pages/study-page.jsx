import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { PROBLEMS } from "../constatns/problems";
import ProblemView from "../components/Problems/ProblemView";
import { useNavigate } from "react-router-dom";

function StudyPage() {
    const navigate = useNavigate();

    return (
        <div className="p-8 px-24">
            <TabGroup>
                <TabList className="flex gap-4">
                    {PROBLEMS.map(({ name }) => (
                        <Tab
                            key={name}
                            className="rounded-xl grow bg-indigo-500 py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-indigo-600 data-[hover]:bg-indigo-500 data-[selected]:data-[hover]:bg-indigo-400 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            {name}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels className="mt-3">
                    {PROBLEMS.map(({ name, levels, reward }, tabIndex) => (
                        <TabPanel
                            key={name}
                            className="rounded-xl bg-white/5 p-3"
                        >
                            <div className="flex flex-col gap-6">
                                {levels.map((_, index) => (
                                    <div onClick={() => navigate(`/problem/${tabIndex}/${index}`)}>
                                        <ProblemView
                                            key={index}
                                            index={index}
                                            reward={reward}
                                        />
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                    ))}
                </TabPanels>
            </TabGroup>
        </div>
    );
}

export default StudyPage;
