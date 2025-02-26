import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (name.trim()) {
      navigate("/quiz", { state: { name } });
    } else {
      alert("Please enter your name!");
    }
  };

  return (
    <>
    <div id="home-bg">
      <div className="home-container">
        <h1>Welcome to the Quiz App!</h1>
        <textarea
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      </div>
    </>
  );
};

export default Home;