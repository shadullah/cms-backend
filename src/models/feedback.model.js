import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    compnyName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imgFeed: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
