import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:1010/quiz-data")
      .then(response => {
        setQuestions(response.data);
        setAnswers(new Array(response.data.length).fill(null));
      })
      .catch(err => console.error("Error fetching quiz questions:", err));
  }, []);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert("Answer all questions before submitting.");
      return;
    }
    axios.post("http://localhost:1010/quiz-data", { answers })
      .then(response => navigate("/result", { state: { score: response.data.score } }))
      .catch(err => alert("Error submitting quiz. Please try again."));
  };

  if (!questions.length) return <div id="quiz-bg">Loading or no questions available.</div>;

  return (
    <div id="quiz-bg">
      <div className="quiz-container">
        <h1>Welcome!</h1>
        <h2>Quiz Questions</h2>
        {questions.map((q, i) => (
          <div key={i} className="question">
            <h3>{q.question}</h3>
            <div className="options">
              {q.options.map((option, j) => (
                <label key={j} className="option">
                  <input
                    type="radio"
                    name={`q-${i}`}
                    checked={answers[i] === j}
                    onChange={() => handleAnswerChange(i, j)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Quiz;
