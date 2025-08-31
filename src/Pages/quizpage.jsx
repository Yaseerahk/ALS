// src/Pages/QuizPage.jsx
import React, { useState } from "react";
import "./quizpage.css";

function QuizPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const quizzes = {
    JavaScript: [
      {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["var", "let", "const", "all of the above"],
        correct: "all of the above",
      },
      {
        question: "Which method is used to parse JSON strings?",
        options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "toJSON()"],
        correct: "JSON.parse()",
      },
    ],
    Python: [
      {
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "func", "lambda"],
        correct: "def",
      },
      {
        question: "Which data type is returned by input() in Python?",
        options: ["int", "string", "float", "boolean"],
        correct: "string",
      },
    ],
  };

  const handleAnswer = (option) => {
    setAnswer(option);
    if (option === quizzes[selectedLanguage][currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizzes[selectedLanguage].length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer(null);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setSelectedLanguage("");
    setCurrentQuestion(0);
    setAnswer(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="quiz-screen">
      {!selectedLanguage ? (
        <div className="w-full text-center">
          <h1 className="text-white text-2xl font-bold mb-8">🎯 Choose Your Topic</h1>
          <div className="topic-grid">
            {Object.keys(quizzes).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className="topic-card"
              >
                <span className="topic-emoji">
                  {lang === "JavaScript" ? "🟨" :
                  lang === "Python" ? "🐍" :
                  lang === "Java" ? "☕" :
                  lang === "HTML" ? "🌐" :
                  lang === "CSS" ? "🎨" : "📘"}
                </span>
                <span className="topic-label">{lang}</span>
              </button>
            ))}
          </div>
        </div>
      ) : finished ? (
        <div className="w-full text-center">
          <h1 className="text-white text-2xl font-bold mb-4">Quiz Finished 🎉</h1>
          <p className="text-white text-lg mb-6">
            You scored <span className="font-bold text-blue-400">{score}</span> out of{" "}
            {quizzes[selectedLanguage].length}
          </p>
          <button className="btn-primary" onClick={restartQuiz}>
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="quiz-header">
            <button className="exit-button" onClick={restartQuiz}>✕</button>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${((currentQuestion + 1) / quizzes[selectedLanguage].length) * 100}%`,
                }}
              ></div>
            </div>
            <span className="progress-count">
              {currentQuestion + 1}/{quizzes[selectedLanguage].length}
            </span>
          </div>

          {/* Timer */}
          <div className="timer-circle">30</div>

          {/* Question */}
          <div className="quiz-question">
            {quizzes[selectedLanguage][currentQuestion].question}
          </div>

          {/* Options */}
          <div className="quiz-options">
            {quizzes[selectedLanguage][currentQuestion].options.map((option, idx) => {
              let statusClass = "";
              if (answer) {
                if (option === quizzes[selectedLanguage][currentQuestion].correct) {
                  statusClass = "correct";
                } else if (option === answer && option !== quizzes[selectedLanguage][currentQuestion].correct) {
                  statusClass = "incorrect";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={!!answer}
                  className={`option-btn ${statusClass} ${answer === option ? "selected" : ""}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          {answer && (
            <button className="next-btn" onClick={nextQuestion}>
              {currentQuestion < quizzes[selectedLanguage].length - 1 ? "Next" : "Finish"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default QuizPage;
