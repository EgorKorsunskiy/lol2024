import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommunicationPage from "./pages/communication-page";
import HomePage from "./pages/home-page";
import StudyPage from "./pages/study-page";
import { initializeApp } from "firebase/app";
import { DBContext } from "./contexts";
import { getFirestore } from "@firebase/firestore";
import ProblemPage from "./pages/problem-page";

const firebaseConfig = {
    apiKey: "AIzaSyDIB9wMTOJ3dvkONsFkkBY7Hs8L8GO7LLA",
    authDomain: "lolsite2024-41ae1.firebaseapp.com",
    projectId: "lolsite2024-41ae1",
    storageBucket: "lolsite2024-41ae1.appspot.com",
    messagingSenderId: "503935093149",
    appId: "1:503935093149:web:5c01fcd72d2fc0f2218774",
};

function App() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return (
        <div>
            <DBContext.Provider value={{ db }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/communication"
                            element={<CommunicationPage />}
                        />
                        <Route path="/study" element={<StudyPage />} />
                        <Route
                            path="/problem/:tabId/:problemId"
                            element={<ProblemPage />}
                        />
                    </Routes>
                </Router>
            </DBContext.Provider>
        </div>
    );
}

export default App;
