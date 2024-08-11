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
                <div className="grid  grid-cols-3 gap-24">
                    <TabList className="flex flex-col gap-8 rounded-xl bg-[#2B777D] w-[70%] p-8">
                        <h2 className="font-mono text-white font-bold text-3xl text-center">Levels</h2>
                        {PROBLEMS.map(({ name }) => (
                            <Tab
                                key={name}
                                className="rounded-full h-20 grow bg-[#579D71] py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-[#7CBD67] data-[focus]:outline-1 data-[focus]:outline-white"
                            >
                                <p className="font-mono text-white font-semibold text-xl">{name}</p>
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels className="mt-3 col-span-2">
                        {PROBLEMS.map(({ name, levels, reward }, tabIndex) => (
                            <TabPanel
                                key={name}
                                className="rounded-xl"
                            >
                                <div className="flex flex-col gap-6">
                                    {levels.map((_, index) => (
                                        <div
                                            onClick={() =>
                                                navigate(
                                                    `/problem/${tabIndex}/${index}`
                                                )
                                            }
                                        >
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
                </div>
            </TabGroup>
        </div>
    );
}

export default StudyPage;
