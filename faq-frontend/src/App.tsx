import './App.css'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
import CreateFAQ from './pages/CreateFaq';
import ViewFAQ from './pages/ViewFaq';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateFAQ />} />
          <Route path="/view" element={<ViewFAQ />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

