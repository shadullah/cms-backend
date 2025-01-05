const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Wolkdvmsdvlksd mashaallah  sdfskrld!");
});

app.get("/cms", (req, res) => {
  res.send("Hello XMS cMS World !!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
