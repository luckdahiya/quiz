const express = require("express");
const Quiz = require("./quizModel");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        console.error("Error fetching quiz data:", err);
        res.send("Error fetching quiz data.");
    }
});

router.post("/", async (req, res) => {
    try {
        const { answers } = req.body;

        if (!Array.isArray(answers)) {
            return res.send("Invalid answers format.");
        }

        const quizzes = await Quiz.find();

        if (quizzes.length !== answers.length) {
            return res.send("Answers length mismatch with quiz data.");
        }

        let score = quizzes.reduce((total, quiz, index) => {
            return total + (quiz.correctAnswer === answers[index] ? 1 : 0);
        }, 0);

        res.json({ score });
    } catch (err) {
        console.error("Error submitting quiz:", err);
        res.send("Error submitting quiz.");
    }
});

module.exports = router;