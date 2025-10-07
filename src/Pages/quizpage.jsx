// QuizPage.jsx
import React, { useState } from "react";
import "./quizpage.css";

export default function QuizPage() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);

const quizzes = {
  HTML: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Trainer Marking Language",
        "Hyper Text Markup Language",
        "Hyper Text Marketing Language",
        "Hyper Text Mark Language",
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      question: "Which HTML element is used to define the largest heading?",
      options: ["<head>", "<h6>", "<h1>", "<heading>"],
      answer: "<h1>",
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      options: ["<break>", "<lb>", "<br>", "<line>"],
      answer: "<br>",
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: ["<a>", "<href>", "<link>", "<url>"],
      answer: "<a>",
    },
    {
      question: "Which HTML attribute specifies an alternate text for an image?",
      options: ["title", "alt", "src", "href"],
      answer: "alt",
    },
    {
      question: "How can you make a numbered list?",
      options: ["<ul>", "<dl>", "<ol>", "<list>"],
      answer: "<ol>",
    },
    {
      question: "Which element is used for creating an unordered list?",
      options: ["<li>", "<ul>", "<ol>", "<list>"],
      answer: "<ul>",
    },
    {
      question: "What is the purpose of the <title> tag?",
      options: [
        "Defines the main heading",
        "Displays text inside the page",
        "Sets the browser tab name",
        "Adds a tooltip",
      ],
      answer: "Sets the browser tab name",
    },
    {
      question: "Which tag is used to display an image?",
      options: ["<img>", "<image>", "<pic>", "<photo>"],
      answer: "<img>",
    },
    {
      question: "Which element is used to define important text?",
      options: ["<strong>", "<em>", "<b>", "<mark>"],
      answer: "<strong>",
    },
  ],

  CSS: [
    {
      question: "Which property controls the text size?",
      options: ["font-style", "text-size", "font-size", "text-style"],
      answer: "font-size",
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets",
      ],
      answer: "Cascading Style Sheets",
    },
    {
      question: "Which property is used to change text color?",
      options: ["font-color", "text-color", "color", "text-style"],
      answer: "color",
    },
    {
      question: "Which CSS property controls the background color?",
      options: ["bgcolor", "background-color", "color", "background"],
      answer: "background-color",
    },
    {
      question: "How do you center text horizontally?",
      options: [
        "text-align: middle;",
        "align: center;",
        "text-align: center;",
        "font-align: center;",
      ],
      answer: "text-align: center;",
    },
    {
      question: "Which property is used to change font?",
      options: ["font-weight", "font-family", "font-style", "font-set"],
      answer: "font-family",
    },
    {
      question: "How do you make text bold?",
      options: ["font-style: bold;", "font-weight: bold;", "bold: yes;", "text-style: bold;"],
      answer: "font-weight: bold;",
    },
    {
      question: "Which property adds space inside an element?",
      options: ["margin", "padding", "border", "spacing"],
      answer: "padding",
    },
    {
      question: "Which property controls outer spacing?",
      options: ["margin", "padding", "border", "outline"],
      answer: "margin",
    },
    {
      question: "Which property makes corners round?",
      options: ["corner-radius", "border-radius", "curve", "round"],
      answer: "border-radius",
    },
  ],

  JavaScript: [
    {
      question: "Which keyword declares a variable in JavaScript?",
      options: ["var", "let", "const", "All of the above"],
      answer: "All of the above",
    },
    {
      question: "Which operator is used to assign a value to a variable?",
      options: ["x", "-", "=", "*"],
      answer: "=",
    },
    {
      question: "How do you write a comment in JavaScript?",
      options: ["<!-- comment -->", "// comment", "# comment", "** comment"],
      answer: "// comment",
    },
    {
      question: "Which method converts JSON to a JavaScript object?",
      options: [
        "JSON.stringify()",
        "JSON.parse()",
        "JSON.convert()",
        "JSON.objectify()",
      ],
      answer: "JSON.parse()",
    },
    {
      question: "Which function displays a message box?",
      options: ["prompt()", "display()", "alert()", "show()"],
      answer: "alert()",
    },
    {
      question: "How can you add an element to the end of an array?",
      options: [".push()", ".pop()", ".shift()", ".add()"],
      answer: ".push()",
    },
    {
      question: "Which symbol is used for strict equality?",
      options: ["==", "===", "=", "!="],
      answer: "===",
    },
    {
      question: "What is the output of typeof null?",
      options: ["null", "undefined", "object", "string"],
      answer: "object",
    },
    {
      question: "What does NaN stand for?",
      options: ["No and Null", "Not a Number", "Negative Number", "None at Number"],
      answer: "Not a Number",
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Netscape", "Oracle", "Sun Microsystems"],
      answer: "Netscape",
    },
  ],

  Java: [
    {
      question: "Which keyword is used to define a class in Java?",
      options: ["class", "Class", "define", "object"],
      answer: "class",
    },
    {
      question: "Which method is the entry point of a Java program?",
      options: ["start()", "main()", "run()", "init()"],
      answer: "main()",
    },
    {
      question: "Which data type is used to store text?",
      options: ["String", "Text", "Character", "Char"],
      answer: "String",
    },
    {
      question: "Which keyword is used to create an object?",
      options: ["create", "new", "instance", "make"],
      answer: "new",
    },
    {
      question: "Which operator is used for comparison?",
      options: ["=", "==", "equals", "compare"],
      answer: "==",
    },
    {
      question: "Which package contains the Scanner class?",
      options: ["java.util", "java.io", "java.text", "java.net"],
      answer: "java.util",
    },
    {
      question: "What does JVM stand for?",
      options: [
        "Java Very Machine",
        "Java Virtual Machine",
        "Java Variable Machine",
        "Java Visual Machine",
      ],
      answer: "Java Virtual Machine",
    },
    {
      question: "Which keyword is used to inherit a class?",
      options: ["this", "extends", "implements", "inherits"],
      answer: "extends",
    },
    {
      question: "Which keyword prevents inheritance?",
      options: ["final", "private", "static", "sealed"],
      answer: "final",
    },
    {
      question: "Which of these is not a Java primitive type?",
      options: ["int", "float", "String", "boolean"],
      answer: "String",
    },
  ],

  React: [
    {
      question: "Which React hook is used to manage state?",
      options: ["useEffect", "useState", "useReducer", "useContext"],
      answer: "useState",
    },
    {
      question: "Which hook runs side effects in React?",
      options: ["useState", "useEffect", "useMemo", "useRef"],
      answer: "useEffect",
    },
    {
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "JSON Syntax Extension",
        "Java Syntax Extension",
        "JavaScript XCode",
      ],
      answer: "JavaScript XML",
    },
    {
      question: "Which method is used to render React content to the DOM?",
      options: ["ReactDOM.display()", "ReactDOM.render()", "renderDOM()", "showReact()"],
      answer: "ReactDOM.render()",
    },
    {
      question: "What is a React component?",
      options: [
        "A function or class that returns UI elements",
        "A CSS file",
        "A server endpoint",
        "A package dependency",
      ],
      answer: "A function or class that returns UI elements",
    },
    {
      question: "Which command creates a new React app?",
      options: [
        "npx create-react-app myApp",
        "npm new react-app",
        "npx start react",
        "react create app",
      ],
      answer: "npx create-react-app myApp",
    },
    {
      question: "Which hook stores a mutable value without causing re-render?",
      options: ["useState", "useMemo", "useRef", "useEffect"],
      answer: "useRef",
    },
    {
      question: "What is the default port for React development server?",
      options: ["8080", "3000", "5000", "8000"],
      answer: "3000",
    },
    {
      question: "How do you pass data to a child component?",
      options: ["through props", "through state", "through context", "through render"],
      answer: "through props",
    },
    {
      question: "Which company maintains React?",
      options: ["Google", "Facebook", "Microsoft", "Amazon"],
      answer: "Facebook",
    },
  ],

  SQL: [
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Strong Question Language",
        "Structured Quick Language",
        "Statement Query Logic",
      ],
      answer: "Structured Query Language",
    },
    {
      question: "Which SQL statement is used to extract data from a database?",
      options: ["EXTRACT", "GET", "SELECT", "PULL"],
      answer: "SELECT",
    },
    {
      question: "Which clause is used to filter records?",
      options: ["WHERE", "ORDER BY", "HAVING", "FILTER"],
      answer: "WHERE",
    },
    {
      question: "Which command removes all records from a table?",
      options: ["DELETE", "REMOVE", "DROP", "TRUNCATE"],
      answer: "TRUNCATE",
    },
    {
      question: "Which keyword sorts the result-set?",
      options: ["SORT BY", "ORDER", "ORDER BY", "SORT"],
      answer: "ORDER BY",
    },
    {
      question: "Which statement adds new data to a table?",
      options: ["INSERT INTO", "ADD", "UPDATE", "CREATE"],
      answer: "INSERT INTO",
    },
    {
      question: "Which function returns the number of rows?",
      options: ["SUM()", "COUNT()", "TOTAL()", "LENGTH()"],
      answer: "COUNT()",
    },
    {
      question: "What does the GROUP BY clause do?",
      options: [
        "Sorts records alphabetically",
        "Groups rows with the same values",
        "Deletes duplicates",
        "Filters results",
      ],
      answer: "Groups rows with the same values",
    },
    {
      question: "Which operator is used with WHERE for pattern matching?",
      options: ["LIKE", "MATCHES", "COMPARE", "SEARCH"],
      answer: "LIKE",
    },
    {
      question: "Which statement is used to change data in a table?",
      options: ["UPDATE", "MODIFY", "CHANGE", "ALTER"],
      answer: "UPDATE",
    },
  ],
  Python: [
  {
    question: "What is the correct file extension for Python files?",
    options: [".pt", ".py", ".pyt", ".python"],
    answer: ".py",
  },
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "def", "fun", "lambda"],
    answer: "def",
  },
  {
    question: "How do you write a comment in Python?",
    options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"],
    answer: "# comment",
  },
  {
    question: "Which of the following is a mutable data type?",
    options: ["tuple", "list", "string", "int"],
    answer: "list",
  },
  {
    question: "What is the output of: print(type('Hello'))?",
    options: ["<class 'str'>", "<class 'int'>", "<class 'char'>", "<class 'text'>"],
    answer: "<class 'str'>",
  },
  {
    question: "Which function is used to get the length of a list?",
    options: ["length()", "count()", "len()", "size()"],
    answer: "len()",
  },
  {
    question: "How do you start a loop that runs 5 times?",
    options: [
      "for i = 1 to 5:",
      "repeat 5 times:",
      "for i in range(5):",
      "loop(5):",
    ],
    answer: "for i in range(5):",
  },
  {
    question: "What is the correct way to import a module named 'math'?",
    options: [
      "import.math",
      "include math",
      "using math",
      "import math",
    ],
    answer: "import math",
  },
  {
    question: "Which keyword is used to handle exceptions?",
    options: ["try", "error", "exception", "handle"],
    answer: "try",
  },
  {
    question: "What is the output of: 3 ** 2?",
    options: ["6", "9", "8", "None of the above"],
    answer: "9",
  },
],

};


  const handleTopicSelect = (language) => {
    setSelectedLanguage(language);
    setCurrentQuestion(0);
    setScore(0);
    setAnswer(null);
  };

  const handleAnswer = (option) => {
    setAnswer(option);
    if (option === quizzes[selectedLanguage][currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const next = currentQuestion + 1;
    if (next < quizzes[selectedLanguage].length) {
      setCurrentQuestion(next);
      setAnswer(null);
    } else {
      alert(`Quiz completed! Your score: ${score}/${quizzes[selectedLanguage].length}`);
      setSelectedLanguage(null);
    }
  };

  return (
    <div className="quiz-screen">
      {!selectedLanguage ? (
        <div className="language-selection">
          <h2>Choose a Topic</h2>
          <div className="topic-grid">
            {Object.keys(quizzes).map((topic, idx) => (
              <div
                key={idx}
                className="topic-card"
                onClick={() => handleTopicSelect(topic)}
              >
                <div className="topic-emoji">📘</div>
                <div className="topic-label">{topic}</div>
                <div className="question-count">
                  {quizzes[topic].length} question
                  {quizzes[topic].length > 1 ? "s" : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="quiz-container">
          <h2 className="quiz-title">{selectedLanguage} Quiz</h2>
          <p className="quiz-question">
            {currentQuestion + 1}.{" "}
            {quizzes[selectedLanguage][currentQuestion].question}
          </p>

          <div className="quiz-options">
            {quizzes[selectedLanguage][currentQuestion].options.map(
              (option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={!!answer}
                  className={`option-btn ${
                    answer
                      ? option === quizzes[selectedLanguage][currentQuestion].answer
                        ? "correct"
                        : answer === option
                        ? "incorrect"
                        : ""
                      : ""
                  }`}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              )
            )}
          </div>

          {answer && (
            <button className="next-btn" onClick={handleNext}>
              Next Question →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
