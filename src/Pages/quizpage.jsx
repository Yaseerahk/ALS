import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./quizpage.css";
import { useNavigate } from "react-router-dom";

function QuizPage() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Use useMemo to prevent quizzes from being repeated
  const quizzes = useMemo(() => ({
    // add more languages and question criteria 
    HTML: [
      {
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correct: "<a>",
        explanation: "The <a> tag defines a hyperlink, which is used to link from one page to another."
      },
      {
        question: "What does the <img> tag require?",
        options: ["src", "alt", "href", "both src and alt"],
        correct: "both src and alt",
        explanation: "The <img> tag requires both src (image source) and alt (alternative text for accessibility)."
      },
      {
        question: "Which HTML tag is used to define a table row?",
        options: ["<tr>", "<td>", "<th>", "<table>"],
        correct: "<tr>",
        explanation: "The <tr> tag defines a row in an HTML table."
      },
      {
        question: "What is the purpose of the <head> tag in HTML?",
        options: ["It displays content", "It defines the footer", "It contains metadata", "It links to images"],
        correct: "It contains metadata",
        explanation: "The <head> tag contains metadata like title, scripts, and styles, which are not displayed on the page."
      },
      {
        question: "Which tag is used to create an unordered list in HTML?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        correct: "<ul>",
        explanation: "The <ul> tag defines an unordered (bulleted) list."
      },
      {
        question: "What does the 'alt' attribute in an <img> tag specify?",
        options: ["Image size", "Image format", "Alternative text", "Image alignment"],
        correct: "Alternative text",
        explanation: "The 'alt' attribute provides alternative text for an image, used for accessibility and when the image cannot load."
      },
      {
        question: "Which tag is used to insert a line break in HTML?",
        options: ["<br>", "<lb>", "<break>", "<newline>"],
        correct: "<br>",
        explanation: "The <br> tag inserts a single line break in the text."
      },
      {
        question: "Which HTML tag is used to create a dropdown list?",
        options: ["<input>", "<select>", "<dropdown>", "<list>"],
        correct: "<select>",
        explanation: "The <select> tag is used to create a dropdown list in HTML forms."
      },
      {
        question: "What is the correct HTML element for inserting a background color?",
        options: ["<body bgColor='red'>", "<background>", "style='background-color:red;'", "<color>"],
        correct: "style='background-color:red;'",
        explanation: "The background color is set using the 'style' attribute with 'background-color' in inline CSS."
      },
      {
        question: "Which tag is used to define the most important heading in HTML?",
        options: ["<heading>", "<h6>", "<h1>", "<title>"],
        correct: "<h1>",
        explanation: "The <h1> tag defines the highest-level heading, typically used for the main title of a page."
      }


    ],
    CSS: [
      {
        question: "Which property is used to change text color in CSS?",
        options: ["font-color", "text-color", "color", "background-color"],
        correct: "color",
        explanation: "The 'color' property is used to set the color of text in CSS."
      },
      {
        question: "Which CSS unit is relative to the root element?",
        options: ["em", "rem", "%", "px"],
        correct: "rem",
        explanation: "'rem' units are relative to the root element's font size, while 'em' is relative to the parent element."
      },
    ],
    Java: [
      {
        question: "Which keyword is used to inherit a class in Java?",
        options: ["this", "super", "extends", "implements"],
        correct: "extends",
        explanation: "The 'extends' keyword is used to create a subclass that inherits from a superclass in Java."
      },
      {
        question: "Which of these is NOT a Java primitive type?",
        options: ["int", "float", "boolean", "string"],
        correct: "string",
        explanation: "'String' is a class in Java, not a primitive type. The primitive types are byte, short, int, long, float, double, boolean, and char."
      },
    ],
    JavaScript: [
      {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["var", "let", "const", "all of the above"],
        correct: "all of the above",
        explanation: "JavaScript has three ways to declare variables: var, let, and const."
      },
      {
        question: "Which method is used to parse JSON strings?",
        options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "toJSON()"],
        correct: "JSON.parse()",
        explanation: "JSON.parse() converts a JSON string into a JavaScript object."
      },
    ],

    React:[
      
        {
          question: "What hook is used to manage state in a functional React component?",
          options: ["useEffect", "useState", "useReducer", "useContext"],
          correct: "useState",
          explanation: "The 'useState' hook is used to add state to functional components in React."
      }
    ],

    Python: [
      {
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "func", "lambda"],
        correct: "def",
        explanation: "The 'def' keyword is used to define a function in Python."
      },
      {
        question: "Which data type is returned by input() in Python?",
        options: ["int", "string", "float", "boolean"],
        correct: "string",
        explanation: "The input() function always returns a string in Python 3.x."
      },

      
    ],
  }), []); 
  // Handle answer selection with useCallback to prevent recreation on every render
  const handleAnswer = useCallback((option) => {
    if (answer) return; 
    
    setAnswer(option);
    const isCorrect = option === quizzes[selectedLanguage][currentQuestion].correct;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Record the answered q's
    setAnsweredQuestions(prev => [...prev, {
      question: quizzes[selectedLanguage][currentQuestion].question,
      userAnswer: option,
      correctAnswer: quizzes[selectedLanguage][currentQuestion].correct,
      isCorrect,
      explanation: quizzes[selectedLanguage][currentQuestion].explanation
    }]);
  }, [answer, currentQuestion, selectedLanguage, quizzes]);

  // Timer effect (simulateion still needed)
  useEffect(() => {
    if (selectedLanguage && !finished && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answer) {
      
      handleAnswer(""); // Empty string indicates time's up
    }
  }, [selectedLanguage, finished, timeLeft, answer, handleAnswer]);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(30);
  }, [currentQuestion]);

  const nextQuestion = () => {
    if (currentQuestion < quizzes[selectedLanguage].length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setAnswer(null);
    } else {
      setFinished(true);
    }
  };

  // Reset everything
  const restartQuiz = () => {
    setSelectedLanguage("");
    setCurrentQuestion(0);
    setAnswer(null);
    setScore(0);
    setFinished(false);
    setTimeLeft(30);
    setAnsweredQuestions([]);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="quiz-screen">
      {!selectedLanguage ? (
        <div className="language-selection">
          <div className="quiz-header">
            <button className="back-button" onClick={goToDashboard}>
              ← Back
            </button>
            <h1 className="quiz-title">Choose Your Topic</h1>
            <div className="points-display">
              <span className="points-count">0</span>
              <span className="points-label">pts</span>
            </div>
          </div>
          
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
                  lang === "CSS" ? "🎨" : "📘"
                  }
                </span>
                <span className="topic-label">{lang}</span>
                <span className="question-count">
                  {quizzes[lang].length} questions
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : finished ? (
        // Results screen
        <div className="results-screen">
          <div className="quiz-header">
            <button className="back-button" onClick={restartQuiz}>
              ← Back
            </button>
            <h1 className="quiz-title">Quiz Results</h1>
            <div className="points-display">
              <span className="points-count">{score}</span>
              <span className="points-label">pts</span>
            </div>
          </div>

          <div className="results-content">
            <div className="score-circle">
              <div className="circle-progress" style={{ 
                background: `conic-gradient(var(--primary) 0% ${(score / quizzes[selectedLanguage].length) * 100}%, var(--gray) 0% 100%)` 
              }}>
                <div className="circle-inner">
                  <span className="score-text">{score}/{quizzes[selectedLanguage].length}</span>
                  <span className="score-percent">
                    {Math.round((score / quizzes[selectedLanguage].length) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            <h2 className="results-title">
              {score === quizzes[selectedLanguage].length ? "Perfect Score! 🎉" :
               score >= quizzes[selectedLanguage].length / 2 ? "Good Job! 👍" : "Keep Practicing! 💪"}
            </h2>

            <div className="results-actions">
              <button className="btn-primary" onClick={restartQuiz}>
                Try Again
              </button>
              <button className="btn-secondary" onClick={goToDashboard}>
                Back to Dashboard
              </button>
            </div>

            <div className="review-section">
              <h3>Question Review</h3>
              <div className="review-list">
                {answeredQuestions.map((item, index) => (
                  <div key={index} className={`review-item ${item.isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="review-question">{item.question}</div>
                    <div className="review-answer">
                      Your answer: <span className={item.isCorrect ? 'correct-text' : 'incorrect-text'}>
                        {item.userAnswer || "Time's up"}
                      </span>
                    </div>
                    {!item.isCorrect && (
                      <div className="review-correct">
                        Correct answer: <span className="correct-text">{item.correctAnswer}</span>
                      </div>
                    )}
                    <div className="review-explanation">{item.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Quiz in progress
        <>
          <div className="quiz-header">
            <button className="back-button" onClick={restartQuiz}>
              ← Back
            </button>
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((currentQuestion + 1) / quizzes[selectedLanguage].length) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="progress-count">
                {currentQuestion + 1}/{quizzes[selectedLanguage].length}
              </span>
            </div>
            <div className="points-display">
              <span className="points-count">{score}</span>
              <span className="points-label">pts</span>
            </div>
          </div>

          {/* Timer */}
          <div className="timer-container">
            <div className="timer-circle">
              <span className="timer-text">{timeLeft}</span>
            </div>
          </div>

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
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation and Next Button */}
          {answer && (
            <div className="answer-feedback">
              <div className={`explanation ${answer === quizzes[selectedLanguage][currentQuestion].correct ? 'correct' : 'incorrect'}`}>
                <h3>{answer === quizzes[selectedLanguage][currentQuestion].correct ? "Correct! 🎉" : "Incorrect 😕"}</h3>
                <p>{quizzes[selectedLanguage][currentQuestion].explanation}</p>
              </div>
              
              <button className="next-btn" onClick={nextQuestion}>
                {currentQuestion < quizzes[selectedLanguage].length - 1 ? "Next Question" : "See Results"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default QuizPage;