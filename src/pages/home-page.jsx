import React, { useState } from "react";
import {
    Button,
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function HomePage() {
    const [modalOpen, setModalOpen] = useState(false);
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    return (
        <div className="mt-48">
            <div className="absolute flex gap-6 h-12 right-8 top-8 items-center">
                {!isAuthenticated ? (
                    <Button
                        onClick={loginWithRedirect}
                        className="bg-indigo-500 h-10 w-28 rounded-md"
                    >
                        <p className="font-mono text-white">Sign in</p>
                    </Button>
                ) : (
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img src={user?.picture} />
                    </div>
                )}
                {isAuthenticated && (
                    <Button
                        onClick={() =>
                            logout({
                                logoutParams: {
                                    returnTo: window.location.origin,
                                },
                            })
                        }
                        className="bg-indigo-500 h-10 w-28 rounded-md"
                    >
                        <p className="font-mono text-white">Sign out</p>
                    </Button>
                )}
            </div>
            <Dialog
                open={modalOpen}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={() => setModalOpen(false)}
            >
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle
                                as="h3"
                                className="text-base/7 font-medium text-white"
                            >
                                Payment successful
                            </DialogTitle>
                            <p className="mt-2 text-sm/6 text-white/50">
                                Your payment has been successfully submitted.
                                We’ve sent you an email with all of the details
                                of your order.
                            </p>
                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Got it, thanks!
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <div className="flex justify-center">
                <h1 className="font-mono text-[6rem]">LOL 2024</h1>
            </div>
            <div className="mt-[12rem] flex justify-center">
                <div className="flex gap-6 flex-col">
                    <Button
                        className="h-12 w-96 rounded bg-[#9db6cc]"
                        onClick={() => navigate("/study")}
                    >
                        <h2 className="text-white font-mono text-md">Study</h2>
                    </Button>
                    <Button
                        className="h-12 w-96 rounded bg-[#397896]"
                        onClick={() => navigate("/communication")}
                    >
                        <h2 className="text-white font-mono">Communication</h2>
                    </Button>
                </div>
            </div>
        </div>
        <img src=“<C:/Users/super/source/repos/lol20241/images/mono> ‘ />
    );
}

export default HomePage;
