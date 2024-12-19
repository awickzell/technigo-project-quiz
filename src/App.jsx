import React, { useState, useEffect } from "react";
import MultiStepForm from "./MultiStepForm";
import Summary from "./Summary";
import data from "./data.json";
import "./index.css";

const App = () => {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [userName, setUserName] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    if (!userName.trim()) {
      alert("Du måste fylla i ditt namn!");
      return;
    }

    const filteredQuestions = data.filter((question) => question.difficulty === difficulty);
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 10));
    setQuizStarted(true);
  };

  const handleSubmit = (data) => {
    setAnswers(data);
    setIsSubmitted(true);
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1>🎬 FILMQUIZ 🎬</h1>
        {!quizStarted ? (
          <div>
            <div className="input-container">
              <label className="input-label">Ditt namn:</label>
              <input
                className="name-input"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Skriv ditt namn"
                required
              />
            </div>

            <div className="input-container">
              <label className="input-label">Svårighetsgrad:</label>
              <select
                className="difficulty-select"
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
              >
                <option value={1}>Lätt</option>
                <option value={2}>Medel</option>
                <option value={3}>Svår</option>
              </select>
            </div>

            <button className="start-quiz-button" onClick={handleStartQuiz}>
              Starta Quiz
            </button>
          </div>
        ) : (
          <>
            {!isSubmitted && <h2 className="welcome-message">Välkommen {userName}! Nu kör vi!</h2>}
            {!isSubmitted ? (
              <MultiStepForm onSubmit={handleSubmit} questions={selectedQuestions} />
            ) : (
              <Summary answers={answers} questions={selectedQuestions} userName={userName} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
