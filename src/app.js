import express from "express";
import cors from "cors";

const app = express();

const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.options("", cors(corsConfig));
app.use(cors(corsConfig));

app.use(express.json({ limit: "16kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("public"));

// ROUTES IMPORT
import feedbackRoute from "./routes/feedback.route.js";
import tagRoute from "./routes/tags.route.js";
import cardRoute from "./routes/card.route.js";
import textRoute from "./routes/text.route.js";

app.use("/api/v1/feedback", feedbackRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/card", cardRoute);
app.use("/api/v1/text", textRoute);

export { app };
