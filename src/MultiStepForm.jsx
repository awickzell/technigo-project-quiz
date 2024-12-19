import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const MultiStepForm = ({ onSubmit, questions }) => {
  const [section, setSection] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(questions.length).fill(""));

  if (!questions.length) {
    return <p>Laddar frågor...</p>;
  }

  const handleOptionChange = (e) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[section] = e.target.value;
    setUserAnswers(updatedAnswers);
  };

  const nextSection = () => {
    setSection(section + 1);
  };

  const prevSection = () => {
    setSection(section - 1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(userAnswers);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="question">
        <h2>{questions[section].question}</h2>
        {questions[section].options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="radio"
                name={`question-${section}`}
                value={option}
                checked={userAnswers[section] === option}
                onChange={handleOptionChange}
                required
              />
              {option}
            </label>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        {section === questions.length - 1 && (
          <button type="submit">
            Skicka in
          </button>
        )}
        {section < questions.length - 1 && (
          <button type="button" onClick={nextSection}>
            Nästa
          </button>
        )}
        {section > 0 && (
          <button type="button" onClick={prevSection}>
            Föregående
          </button>
        )}

      </div>

      <ProgressBar currentStep={section} totalSteps={questions.length} />
    </form>
  );
};

export default MultiStepForm;
