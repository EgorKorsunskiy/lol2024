import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { DBContext } from "../contexts";
import {
    collection,
    getDocs,
    addDoc
} from "firebase/firestore";

function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [coins, setCoins] = useState(0);
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const { db } = useContext(DBContext);
    const usersCollectionRef = collection(db, "users");

    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        const userData = data.docs.map((doc) => doc.data());

        return userData;
    };

    const createUser = async (userId, coins) => {
        await addDoc(usersCollectionRef, {
            id: userId,
            coins,
        });
    };

    const handleUser = async () => {
        const userData = await getUsers();
        const currentUser = userData.find((userEl) => userEl.id === user.sub);

        if (!currentUser) {
            createUser(user.sub, 0);
        } else {
            setCoins(currentUser.coins);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            handleUser();
        }
    }, [isAuthenticated]);

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
                    <div
                        className="h-12 w-12 rounded-full overflow-hidden cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
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
            <AnimatePresence>
                {isOpen && (
                    <Dialog
                        static
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        className="relative z-50"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30"
                        />
                        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                            <DialogPanel
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex justify-center w-fit max-w-lg rounded-md space-y-4 bg-white py-12 px-24 w-96"
                            >
                                <div>
                                    <DialogTitle className="font-mono text-3xl font-bold">
                                        Details
                                    </DialogTitle>
                                    <div className="mt-12 flex flex-col items-start justify-between">
                                        <p className="font-mono text-lg">
                                            Nickname: {user.nickname}
                                        </p>
                                        <p className="font-mono text-lg">
                                            Email: {user.email}
                                        </p>
                                        <p className="font-mono text-lg">
                                            Coins: {coins}
                                        </p>
                                    </div>
                                    <div className="flex justify-center gap-4 mt-12">
                                        <Button
                                            className="bg-indigo-500 h-10 w-full rounded-md"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <p className="font-mono text-white">
                                                Close
                                            </p>
                                        </Button>
                                    </div>
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>
                )}
            </AnimatePresence>
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
    );
}

export default HomePage;
