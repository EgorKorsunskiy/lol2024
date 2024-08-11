import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommunicationPage from "./pages/communication-page";
import HomePage from "./pages/home-page";
import StudyPage from "./pages/study-page";
import { initializeApp } from "firebase/app";
import { DBContext } from "./contexts";
import {getFirestore} from "@firebase/firestore"
import ProblemPage from "./pages/problem-page";

const firebaseConfig = {
    apiKey: "AIzaSyAAOCCDwNbQyyvcbtfroUgTitI30TH7QAU",
    authDomain: "test-782d0.firebaseapp.com",
    databaseURL: "https://test-782d0.firebaseio.com",
    projectId: "test-782d0",
    storageBucket: "test-782d0.appspot.com",
    messagingSenderId: "362872276",
    appId: "1:362872276:web:1c1d31063e5648b5e36a41",
    measurementId: "G-KTK49TPLVT",
};

function App() {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)

    return (
        <div>
            <DBContext.Provider value={{db}}>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/communication"
                            element={<CommunicationPage />}
                        />
                        <Route path="/study" element={<StudyPage />} />
                        <Route path="/problem/:tabId/:problemId" element={<ProblemPage />} />
                    </Routes>
                </Router>
            </DBContext.Provider>
        </div>
    );
}

export default App;
