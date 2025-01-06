import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Homepage } from "../models/text.model.js";

const createText = asyncHandler(async (req, res) => {
  const {
    hero,
    expert,
    overview,
    digitalPartners,
    team,
    bigSection,
    services,
    footer,
  } = req.body;

  // Validate required fields
  if (
    !hero?.title ||
    !expert?.paragraph ||
    !expert?.expertiseTypes ||
    !overview?.heading ||
    !overview?.paragraph ||
    !overview?.statistics ||
    !digitalPartners?.title ||
    !digitalPartners?.paragraph ||
    !team?.paragraph ||
    !team?.statistics ||
    !team?.story ||
    !bigSection?.heading ||
    !services?.serviceTypes[0]?.name ||
    !footer?.paragraph ||
    !footer?.contact
  ) {
    throw new ApiError(400, "All required fields must be provided");
  }

  const text = await Homepage.create({
    hero,
    expert,
    overview,
    digitalPartners,
    team,
    bigSection,
    services,
    footer,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, text, "Homepage text created successfully"));
});

const getText = asyncHandler(async (req, res) => {
  const text = await Homepage.findOne().sort({ createdAt: -1 }); // Get the most recent text

  if (!text) {
    throw new ApiError(404, "Homepage text not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, text, "Homepage text fetched successfully"));
});

const updateText = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const text = await Homepage.findById(id);

  if (!text) {
    throw new ApiError(404, "Homepage text not found");
  }

  // Update each section if provided
  Object.keys(updateData).forEach((key) => {
    if (text[key] !== undefined) {
      // If it's an object, merge with existing data
      if (
        typeof updateData[key] === "object" &&
        !Array.isArray(updateData[key])
      ) {
        text[key] = { ...text[key].toObject(), ...updateData[key] };
      } else {
        text[key] = updateData[key];
      }
    }
  });

  await text.save();

  return res
    .status(200)
    .json(new ApiResponse(200, text, "Homepage text updated successfully"));
});

export { createText, getText, updateText };
