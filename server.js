const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { showLendingPage } = require("./public/js/lending");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set("view engine", "ejs");

const mongoose = require("mongoose");

const MONGODB_URL =
  "mongodb+srv://foopx1369:qwer1234@cluster0.xcffw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to database successfully");
  } catch (err) {
    console.error("Failed to connect to the database", err);
  }
}

connectToDatabase();

// 정적 파일 제공 미들웨어
app.use(express.static(path.join(__dirname, "public")));

// 루트 경로에서 lending.html 파일 제공
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "lending.html"));
});

app.get("/lending", showLendingPage);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({ status: "pending" });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
