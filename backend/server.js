const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConnect");
const quizRoutes = require("./quizRoutes");

const app = express();

app.use(cors());
app.use(express.json());

dbConnect();

app.use("/quiz-data", quizRoutes);

app.listen(1010, () => console.log(`Server running on http://localhost:1010`));
