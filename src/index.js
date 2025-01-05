import dotenv from "dotenv";
import axios from "axios";
import mongoose from "mongoose";
import { app } from "./app.js";

const port = 3000;

dotenv.config({
  path: "./.env",
});

app.get("/", (req, res) => {
  res.send("This is an CMS Backend!!  ");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
