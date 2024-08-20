const express = require("express");
const path = require("path");
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// 뷰 엔진 설정
app.set("view engine", "ejs");

// 정적 파일 제공 미들웨어 설정
app.use(express.static(path.join(__dirname, "public")));

// 라우트 설정
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "lending.html"));
});

app.get("/lending", showLendingPage);
// 서버 실행
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
