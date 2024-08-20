const express = require("express");
const app = express();
<<<<<<< HEAD
const port = 8001;
=======
const port = 5000;
>>>>>>> e4ca0168bea601adcd1885005e0789114c30ec59

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
