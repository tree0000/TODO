const express = require("express");
const path = require("path");
<<<<<<< HEAD
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { showLendingPage } = require("./public/js/lending");

const app = express();
const port = 8003;

// MongoDB 연결 설정
const MONGODB_URL =
  "";
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Failed to connect to the database", err));

// 미들웨어 설정
=======
const app = express();
const port = 8000;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { showLendingPage } = require("./public/js/lending");

>>>>>>> e4ca0168bea601adcd1885005e0789114c30ec59
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

<<<<<<< HEAD
// 뷰 엔진 설정
app.set("view engine", "ejs");

// 정적 파일 제공 미들웨어 설정
app.use(express.static(path.join(__dirname, "public")));

// 라우트 설정
=======
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
>>>>>>> e4ca0168bea601adcd1885005e0789114c30ec59
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "lending.html"));
});

app.get("/lending", showLendingPage);
<<<<<<< HEAD
// 서버 실행
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
=======

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
>>>>>>> e4ca0168bea601adcd1885005e0789114c30ec59
