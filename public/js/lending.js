const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.listen(8002, () => {
  console.log("Server is running on http://localhost:8003");
});

function showLendingPage(req, res) {
  res.send("This is the Lending Page");
}

module.exports = { showLendingPage };


