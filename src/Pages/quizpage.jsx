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
        question: "Which property is used to set the background color of an element?",
        options: ["color", "bgcolor", "background-color", "background"],
        correct: "background-color",
        explanation: "The 'background-color' property is used to set the background color of an element in CSS."
      },
      {
        question: "What does the 'display: flex' property do?",
        options: ["Aligns text", "Creates a flex container", "Hides the element", "Sets background color"],
        correct: "Creates a flex container",
        explanation: "'display: flex' turns an element into a flex container, enabling flexible layouts for its children."
      },
      {
        question: "Which property is used to control the space between lines of text?",
        options: ["letter-spacing", "line-height", "text-spacing", "font-size"],
        correct: "line-height",
        explanation: "The 'line-height' property sets the vertical space between lines of text."
      },
      {
        question: "How do you select an element with the ID 'main' in CSS?",
        options: ["#main", ".main", "main", "@main"],
        correct: "#main",
        explanation: "In CSS, the '#' symbol is used to select elements by their ID."
      },
      {
        question: "Which property controls the size of text?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        correct: "font-size",
        explanation: "The 'font-size' property is used to set the size of the text content."
      },
      {
        question: "What is the default position value of an HTML element?",
        options: ["absolute", "relative", "static", "fixed"],
        correct: "static",
        explanation: "By default, elements have 'position: static', meaning they are positioned according to the normal document flow."
      },
      {
        question: "Which property is used to make text bold in CSS?",
        options: ["font-style", "font-weight", "text-decoration", "bold"],
        correct: "font-weight",
        explanation: "'font-weight' is used to set how thick or thin characters in text should appear. 'font-weight: bold;' makes text bold."
      },
      {
        question: "Which shorthand property sets the top, right, bottom, and left margins?",
        options: ["padding", "margin", "spacing", "border"],
        correct: "margin",
        explanation: "'margin' is a shorthand property that allows you to set all four margins (top, right, bottom, left) in one line."
      },
      {
        question: "What is the difference between 'em' and 'rem' units in CSS?",
        options: [
          "'em' is relative to the parent element's font size, 'rem' is relative to the root element's font size",
          "'em' is always absolute, 'rem' is relative to the parent element",
          "'em' and 'rem' are identical and interchangeable",
          "'em' is relative to the viewport width, 'rem' is relative to the viewport height"
        ],
        correct: "'em' is relative to the parent element's font size, 'rem' is relative to the root element's font size",
        explanation: "'em' units are relative to the font size of the parent element, which means they compound when nested. 'rem' units are relative to the font size of the root (html) element, making them consistent throughout the document."
      },
      {
        question: "How does the CSS 'contain' property improve performance?",
        options: [
          "By limiting the scope of the browser’s rendering, layout, and style calculations to a specific element",
          "By forcing the browser to reload stylesheets",
          "By disabling animations and transitions on the page",
          "By compressing CSS files automatically"
        ],
        correct: "By limiting the scope of the browser’s rendering, layout, and style calculations to a specific element",
        explanation: "The 'contain' property allows developers to specify that an element’s subtree is independent from the rest of the document, enabling browsers to optimize rendering and improve performance by limiting layout, style, and paint calculations."
      }


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
      {
        question: "Which method is the entry point of any Java program?",
        options: ["start()", "main()", "run()", "init()"],
        correct: "main()",
        explanation: "The 'main()' method is the entry point of every Java application. It has the signature: public static void main(String[] args)."
      },
      {
        question: "What is the size of an int in Java?",
        options: ["8 bits", "16 bits", "32 bits", "64 bits"],
        correct: "32 bits",
        explanation: "In Java, the 'int' data type is a 32-bit signed two's complement integer."
      },
      {
        question: "Which keyword is used to prevent inheritance of a class?",
        options: ["static", "final", "const", "private"],
        correct: "final",
        explanation: "The 'final' keyword prevents a class from being subclassed (inherited)."
      },
      {
        question: "What is the default value of a boolean variable in Java?",
        options: ["true", "false", "null", "0"],
        correct: "false",
        explanation: "In Java, the default value of a boolean is 'false'."
      },
      {
        question: "Which of the following is used to handle exceptions in Java?",
        options: ["catch", "error", "try-catch", "exception"],
        correct: "try-catch",
        explanation: "Java uses 'try-catch' blocks to handle exceptions and prevent program crashes."
      },
      {
        question: "What does JVM stand for?",
        options: ["Java Verified Machine", "Java Virtual Machine", "Java Variable Method", "Java Version Manager"],
        correct: "Java Virtual Machine",
        explanation: "JVM stands for Java Virtual Machine, which allows Java bytecode to be executed on any device."
      },
      {
        question: "Which collection class does not allow duplicate elements?",
        options: ["List", "ArrayList", "Set", "Map"],
        correct: "Set",
        explanation: "The 'Set' interface in Java does not allow duplicate elements, unlike List or ArrayList."
      },
      {
        question: "What is the purpose of the 'super' keyword in Java?",
        options: ["To call the parent class constructor or method", "To define a constant", "To stop a loop", "To create a superclass"],
        correct: "To call the parent class constructor or method",
        explanation: "The 'super' keyword is used to refer to the immediate parent class and is often used to invoke parent constructors or methods."
      }

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
      {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["<!-- -->", "//", "/* */", "#"],
        correct: "//",
        explanation: "// is used to write single-line comments in JavaScript."
      },
      {
        question: "What is the output of 'typeof null' in JavaScript?",
        options: ["null", "object", "undefined", "boolean"],
        correct: "object",
        explanation: "Due to a long-standing bug in JavaScript, 'typeof null' returns 'object'."
      },
      {
        question: "What is the result of '2' + 2 in JavaScript?",
        options: ["4", "22", "NaN", "undefined"],
        correct: "22",
        explanation: "When using the '+' operator with a string and a number, JavaScript performs string concatenation."
      },
      {
        question: "Which keyword is used to define a function in JavaScript?",
        options: ["define", "function", "fun", "method"],
        correct: "function",
        explanation: "The 'function' keyword is used to declare functions in JavaScript."
      },
      {
        question: "Which array method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: "push()",
        explanation: "The 'push()' method adds one or more elements to the end of an array."
      },
      {
        question: "Which value is considered falsy in JavaScript?",
        options: ["0", "'' (empty string)", "null", "All of the above"],
        correct: "All of the above",
        explanation: "Falsy values in JavaScript include 0, '', null, undefined, NaN, and false."
      },
      {
        question: "What is the scope of a variable declared with 'let'?",
        options: ["Global", "Function", "Block", "Module"],
        correct: "Block",
        explanation: "'let' is block-scoped, meaning it is only accessible within the enclosing block."
      },
      {
        question: "Which method is used to convert a JavaScript object to a JSON string?",
        options: ["JSON.stringify()", "JSON.parse()", "toString()", "JSON.toText()"],
        correct: "JSON.stringify()",
        explanation: "'JSON.stringify()' converts a JavaScript object or value to a JSON-formatted string."
      }

    ],

    React:[
      
        {
          question: "What hook is used to manage state in a functional React component?",
          options: ["useEffect", "useState", "useReducer", "useContext"],
          correct: "useState",
          explanation: "The 'useState' hook is used to add state to functional components in React."
      },
      {
        question: "Which hook is used to perform side effects in a React component?",
        options: ["useState", "useEffect", "useMemo", "useRef"],
        correct: "useEffect",
        explanation: "The 'useEffect' hook is used to perform side effects such as data fetching, subscriptions, or DOM manipulation."
      },
      {
        question: "What does JSX stand for?",
        options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
        correct: "JavaScript XML",
        explanation: "JSX stands for JavaScript XML, and it allows writing HTML-like syntax directly in JavaScript."
      },
      {
        question: "What prop is used to uniquely identify items in a list?",
        options: ["id", "key", "index", "value"],
        correct: "key",
        explanation: "The 'key' prop helps React identify which items have changed, are added, or are removed."
      },
      {
        question: "Which method is used to pass data from a parent to a child component?",
        options: ["state", "props", "context", "setState"],
        correct: "props",
        explanation: "Props (short for properties) are used to pass data from parent to child components in React."
      },
      {
        question: "What does the useContext hook do?",
        options: ["Manages local state", "Creates global state", "Consumes context", "Fetches data"],
        correct: "Consumes context",
        explanation: "The 'useContext' hook allows a component to consume values from a context without using a Consumer wrapper."
      },
      {
        question: "Which React hook is used to memoize a value?",
        options: ["useMemo", "useEffect", "useRef", "useCallback"],
        correct: "useMemo",
        explanation: "'useMemo' returns a memoized value and helps avoid expensive calculations on every render."
      },
      {
        question: "Which lifecycle method does useEffect replicate?",
        options: ["componentDidMount", "componentDidUpdate", "componentWillUnmount", "All of the above"],
        correct: "All of the above",
        explanation: "'useEffect' can replicate all three: componentDidMount, componentDidUpdate, and componentWillUnmount depending on its dependency array."
      },
      {
        question: "What is the purpose of React.Fragment?",
        options: ["To create a reusable component", "To add styles", "To return multiple elements without a wrapper", "To manage state"],
        correct: "To return multiple elements without a wrapper",
        explanation: "React.Fragment lets you group multiple elements without adding extra nodes to the DOM."
      },
      {
        question: "How do you create a new React app using Create React App?",
        options: ["npm create-react-app myApp", "npx create-react-app myApp", "react-create-app myApp", "npx react-app myApp"],
        correct: "npx create-react-app myApp",
        explanation: "The official way to create a new React app is by using 'npx create-react-app myApp'."
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
      {
        question: "What is the output of the expression '5 // 2' in Python?",
        options: ["2.5", "2", "3", "1"],
        correct: "2",
        explanation: "'//' is the floor division operator, which returns the quotient without the remainder."
      },
      {
        question: "Which keyword is used to create a class in Python?",
        options: ["class", "def", "object", "struct"],
        correct: "class",
        explanation: "The 'class' keyword is used to define a new class in Python."
      },
      {
        question: "What does the 'len()' function do in Python?",
        options: ["Returns the length of an object", "Converts a value to integer", "Prints a value", "Defines a list"],
        correct: "Returns the length of an object",
        explanation: "'len()' returns the number of items in an object like a list, string, tuple, etc."
      },
      {
        question: "How do you start a comment in Python?",
        options: ["//", "#", "/*", "<!--"],
        correct: "#",
        explanation: "In Python, comments start with the '#' symbol."
      },
      {
        question: "What is the output of the following code? print(type([]))",
        options: ["list", "tuple", "dict", "set"],
        correct: "list",
        explanation: "An empty pair of square brackets '[]' represents a list in Python."
      },
      {
        question: "Which of the following is a mutable data type in Python?",
        options: ["tuple", "list", "string", "int"],
        correct: "list",
        explanation: "Lists are mutable, meaning their elements can be changed after creation."
      },
      {
        question: "Which keyword is used to handle exceptions in Python?",
        options: ["try", "catch", "except", "finally"],
        correct: "except",
        explanation: "The 'except' block is used to catch and handle exceptions after a 'try' block."
      },
      {
        question: "What is the output of: bool('False')?",
        options: ["False", "True", "Error", "None"],
        correct: "True",
        explanation: "Any non-empty string in Python evaluates to True when converted to a boolean."
      }


      
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