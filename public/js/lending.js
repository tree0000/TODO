const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

function showLendingPage(req, res) {
  res.send("This is the Lending Page");
}

module.exports = { showLendingPage };
