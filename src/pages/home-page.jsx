import React, { useContext, useEffect, useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { DBContext } from "../contexts";
import logoImage from "../images/logo.png";
import qrCodeImage from "../images/qr-code.png";
import { collection, getDocs, addDoc } from "firebase/firestore";

function HomePage() {
    const [isOpen, setIsOpen] = useState(false);
    const [coins, setCoins] = useState(0);
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const { db } = useContext(DBContext);
    const usersCollectionRef = collection(db, "users");

    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        const userData = data.docs.map((doc) => ({
            ...doc.data(),
            innerId: doc.id,
        }));

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
            localStorage.setItem("coins", currentUser.coins);
            localStorage.setItem("id", currentUser.innerId);
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
                {!isAuthenticated && (
                    <Button
                        onClick={loginWithRedirect}
                        className="bg-indigo-500 h-10 w-28 rounded-md"
                    >
                        <p className="font-mono text-white">Sign in</p>
                    </Button>
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
            <div className="grid grid-cols-4 gap-16">
                <div className="flex justify-center items-center w-56 px-8 bg-[#2B777C]">
                    <div className="flex gap-6 flex-col w-full">
                        <Button
                            className="h-12 w-full rounded bg-[#81ACAB]"
                            onClick={() => navigate("/study")}
                        >
                            <h2 className="text-white font-mono font-semibold text-mxl">
                                Study
                            </h2>
                        </Button>
                        <Button
                            className="h-12 w-full rounded bg-[#81ACAB]"
                            onClick={() => navigate("/communication")}
                        >
                            <h2 className="text-white font-mono font-semibold text-mxl">
                                Communication
                            </h2>
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center col-span-2">
                    <img src={logoImage} />
                </div>
                <div className="flex flex-col justify-between items-end pr-8">
                    {isAuthenticated && (
                        <div className="flex flex-col gap-4">
                            <p className="font-mono text-white text-2xl font-medium text-center">
                                {user?.nickname}
                            </p>
                            <div
                                className="h-48 w-48 cursor-pointer"
                                onClick={() => setIsOpen(true)}
                            >
                                <img className="w-full" src={user?.picture} />
                            </div>
                        </div>
                    )}
                    <div
                        className="h-52 w-52 cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        <img className="w-full" src={qrCodeImage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
