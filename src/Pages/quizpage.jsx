// src/Pages/QuizPage.jsx
import React, { useState } from "react";
import "./quizpage.css";

function QuizPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState(null);

  const quizzes = {
    JavaScript: [
      {
        question: "Which of these is NOT a JavaScript data type?",
        options: ["String", "Number", "Boolean", "Class"],
        correct: "Class",
      },
      {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "#", "<!-- -->", "/* */"],
        correct: "//",
      },
    ],
    Python: [
      {
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "func", "def", "lambda"],
        correct: "def",
      },
      {
        question: "What is the output of: type([])?",
        options: ["list", "dict", "tuple", "array"],
        correct: "list",
      },
    ],
  };

  const handleAnswer = (option) => {
    setAnswer(option);
  };

  const nextQuestion = () => {
    setAnswer(null);
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8">
        {!selectedLanguage ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Choose Your Language
            </h1>
            <div className="flex flex-col gap-4">
              {Object.keys(quizzes).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-xl text-lg font-semibold hover:scale-105 transform transition duration-300 shadow-lg"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Quiz Card */}
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Question {currentQuestion + 1} of {quizzes[selectedLanguage].length}
            </h2>
            <div className="border rounded-2xl p-6 mb-6 shadow-md bg-gray-50">
              <p className="text-md font-medium text-gray-800 mb-5">
                {quizzes[selectedLanguage][currentQuestion].question}
              </p>
              <div className="flex flex-col gap-3">
                {quizzes[selectedLanguage][currentQuestion].options.map(
                  (option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option)}
                      className={`py-3 px-4 rounded-xl border transition 
                        ${
                          answer === option
                            ? "bg-indigo-500 text-white font-semibold"
                            : "bg-white hover:bg-indigo-50"
                        }`}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setSelectedLanguage("")}
                className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition shadow-sm"
              >
                Back
              </button>
              {currentQuestion < quizzes[selectedLanguage].length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="px-5 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 font-medium transition shadow-md"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedLanguage("");
                    setCurrentQuestion(0);
                    setAnswer(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 font-medium transition shadow-md"
                >
                  Finish
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
