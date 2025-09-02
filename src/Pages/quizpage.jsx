// src/Pages/QuizPage.jsx
import React, { useState } from "react";
import "./quizpage.css";

function QuizPage() {
  // quiz states
  const [selectedLanguage, setSelectedLanguage] = useState("");
  // current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  // quiz finished
  const [finished, setFinished] = useState(false);
const quizzes = {

  // quiz questions (add more)
  HTML: [
    {
      question: "Which tag is used to create a hyperlink in HTML?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correct: "<a>",
    },
    {
      question: "What does the <img> tag require?",
      options: ["src", "alt", "href", "both src and alt"],
      correct: "both src and alt",
    },
  ],
  CSS: [
    {
      question: "Which property is used to change text color in CSS?",
      options: ["font-color", "text-color", "color", "background-color"],
      correct: "color",
    },
    {
      question: "Which CSS unit is relative to the root element?",
      options: ["em", "rem", "%", "px"],
      correct: "rem",
    },
  ],
  Java: [
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["this", "super", "extends", "implements"],
      correct: "extends",
    },
    {
      question: "Which of these is NOT a Java primitive type?",
      options: ["int", "float", "boolean", "string"],
      correct: "string",
    },
  ],
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


// handle answer selection
  const handleAnswer = (option) => {
    setAnswer(option); //save answer
    if (option === quizzes[selectedLanguage][currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
        // Check if selected option is correct and update score 
    if (currentQuestion < quizzes[selectedLanguage].length - 1) {
      setCurrentQuestion((prev) => prev + 1); //next q
      setAnswer(null);
    } else {
      setFinished(true); //completed quiz after last q is answered
    }
  };

  // reset everything 
  const restartQuiz = () => {
    setSelectedLanguage("");
    setCurrentQuestion(0);
    setAnswer(null);
    setScore(0);//reset score
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

        //result when quiz is finished 
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
          {/* Header with exit button*/}
          <div className="quiz-header">
            <button className="exit-button" onClick={restartQuiz}>✕</button>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  // progress bar (calc how many q's completed)
                  width: `${((currentQuestion + 1) / quizzes[selectedLanguage].length) * 100}%`,
                }}
              ></div>
            </div>
            <span className="progress-count">
              {currentQuestion + 1}/{quizzes[selectedLanguage].length}
            </span>
          </div>

          {/* Timer (enable)*/}
          <div className="timer-circle">30</div>

          {/* Q's text  */}
          <div className="quiz-question">
            {quizzes[selectedLanguage][currentQuestion].question}
          </div>

          {/* Options */}
          <div className="quiz-options">
            {quizzes[selectedLanguage][currentQuestion].options.map((option, idx) => {
              let statusClass = "";
              if (answer) {
                if (option === quizzes[selectedLanguage][currentQuestion].correct) {
                  statusClass = "correct";//highlight correct answer
                } else if (option === answer && option !== quizzes[selectedLanguage][currentQuestion].correct) {
                  statusClass = "incorrect";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={!!answer}//choose only once
                  className={`option-btn ${statusClass} ${answer === option ? "selected" : ""}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Next Button (next or finish)*/}
          {answer && (
            <button className="next-btn" onClick={nextQuestion}>
              {/* finish button for last q */}
              {currentQuestion < quizzes[selectedLanguage].length - 1 ? "Next" : "Finish"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default QuizPage;
