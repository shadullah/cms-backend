import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Card } from "../models/card.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createCard = asyncHandler(async (req, res) => {
  const { title, tag, latest = false } = req.body;

  if (!title || !tag) {
    throw new ApiError(400, "Title and tag are required");
  }

  const imgLocalPath = req.files?.img[0]?.path;

  if (!imgLocalPath) {
    throw new ApiError(400, "Image file is required");
  }

  const img = await uploadOnCloudinary(imgLocalPath);

  if (!img.url) {
    throw new ApiError(400, "Error while uploading image");
  }

  const card = await Card.create({
    title,
    img: img.url,
    latest,
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
