import { Tag } from "../models/tag.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTags = asyncHandler(async (req, res) => {
  const { tagName, slug } = req.body;

  if ([tagName, slug].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const tags = await Tag.create({
    tagName,
    slug,
  });

  if (!tags) {
    throw new ApiError(500, "tags creation failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tags, "tags created successfully"));
});

const getTags = asyncHandler(async (req, res) => {
  const getags = await Tag.find({});

  if (!getags || getags.length === 0) {
    throw new ApiError(500, "Fetch failed or no tags");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, getags, "tags fetched succesfullly"));
});

export { createTags, getTags };
