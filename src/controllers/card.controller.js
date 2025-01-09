import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Card } from "../models/card.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createCard = asyncHandler(async (req, res) => {
  const { title, latest, tag } = req.body;

  if ([title, tag].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const imgLocalPath = req.files?.img[0]?.path;

  if (!imgLocalPath) {
    throw new ApiError(400, "Image file is required");
  }

  const img = await uploadOnCloudinary(imgLocalPath);

  if (!img) {
    throw new ApiError(400, "Image upload failed");
  }

  const card = await Card.create({
    title,
    img: img.url,
    latest: latest === "true",
    tag,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, card, "Card created successfully"));
});

const getAllCards = asyncHandler(async (req, res) => {
  const cards = await Card.find({});

  return res
    .status(200)
    .json(new ApiResponse(200, cards, "Cards fetched successfully"));
});

export { createCard, getAllCards };
