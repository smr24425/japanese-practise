import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import "./App.css";
import Layout from "./Layout";
import HistoryPage from "./pages/History";
import PracticeList from "./pages/PracticeList";
import HandwritePractice from "./pages/HandwritePractice";

const App: React.FC = () => {
  return (
    <div className="app-page">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/practice" element={<PracticeList />} />
          <Route
            path="/practice/handwrite/:romaji"
            element={<HandwritePractice />}
          />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
