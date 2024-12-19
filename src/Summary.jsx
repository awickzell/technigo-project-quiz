import React from "react";
import "./Summary";

const Summary = ({ answers, questions, userName }) => {
  const correctAnswersCount = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;

  return (
    <div className="summary-container">
      <h3 className="score">🎉 Grattis {userName}! Du fick {correctAnswersCount}/{questions.length} rätt! 🎉</h3>
      {questions.map((question, index) => {
        const isCorrect = answers[index] === question.correctAnswer;
        return (
          <div key={index} className="summary-item">
            <p><strong>Fråga:</strong> {question.question}</p>
            <p>
              <strong>Ditt svar:</strong> {answers[index]}{" "}
              {isCorrect ? <span className="correct-symbol">✔️</span> : <span className="incorrect-symbol">❌</span>}
            </p>
            {!isCorrect && (
              <p><strong>Rätt svar:</strong> {question.correctAnswer}</p>
            )}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Summary;
