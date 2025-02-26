import { useLocation } from "react-router-dom";
import "./Result.css";

const Result = () => {
  const location = useLocation();
  const score = location.state?.score || 0;

  return (
    <>
    <div id="result-bg">
    <div className="result-container">
      <h1>Quiz Result</h1>
      <p className="result">{score}</p>
    </div>
    </div>
    </>
  );
};

export default Result;