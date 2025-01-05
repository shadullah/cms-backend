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
    // img,
    // username
  },
  { timestamps: true }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
