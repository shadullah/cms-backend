import { Feedback } from "../models/feedback.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createFeedback = asyncHandler(async (req, res) => {
  const { description, compnyName, name } = req.body;

  if ([description, compnyName, name].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const imgPath = req.files?.imgFeed[0]?.path;
  // const thumbLocalPath = req.files?.thumbnail[0]?.path;

  if (!imgPath) {
    throw new ApiError(400, "img file is missing");
  }

  const imgFile = await uploadOnCloudinary(imgPath);
  // const imgFile = await uploadOnCloudinary(thumbLocalPath);

  if (!imgFile) {
    throw new ApiError(400, "img file is required");
  }

  const feedback = await Feedback.create({
    description,
    compnyName,
    name,
    imgFeed: imgFile?.url,
  });

  if (!feedback) {
    throw new ApiError(500, "feedback creation failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, feedback, "feedback created success!!"));
});

const getFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find({});

  if (!feedbacks || feedbacks.length === 0) {
    throw new ApiError(500, "Getting feedback failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, feedbacks, "feedback got fetched success!!"));
});

export { createFeedback, getFeedbacks };
