import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CommunicationPage from './pages/communication-page';
import HomePage from './pages/home-page';
import StudyPage from './pages/study-page';

function App() {  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/communication" element={<CommunicationPage />} />
          <Route path="/study" element={<StudyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
