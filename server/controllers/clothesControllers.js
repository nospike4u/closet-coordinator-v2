import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/ErrorResponse.js";
import Clothes from "../models/Clothes.js";

export const getAllClothes = asyncHandler(async (req, res, next) => {
  const data = await Clothes.find();
  if (!data) {
    return next(new ErrorResponse(`Server error`, 500));
  }
  res.status(200).json({ success: true, data });
});

export const getOneClothes = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  if (!id) {
    return next(new ErrorResponse(`Invalid input`, 400));
  }
  const data = await Clothes.findById(id);
  if (!data) {
    return next(new ErrorResponse(`User not found`, 404));
  }
  res.status(200).json({ success: true, data });
});

export const getClothesByCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.params;
  if (!category) {
    return next(new ErrorResponse("Invalid input", 400));
  }

  const data = await Clothes.find({ category });
  if (!data) {
    return next(new ErrorResponse("No items found", 404));
  }

  res.status(200).json({ success: true, data });
});

export const createClothes = asyncHandler(async (req, res, next) => {
  const { body } = req;

  // if ( !body.category || !body.type  || !body.color || !body.seasons || !body.occasion || !body.img||!body.energyLevel ) {
  //   return next(new ErrorResponse("invalid input!", 400));
  // }
  console.log(body);
  const data = await Clothes.create(req.body);
  if (!data) {
    return next(new ErrorResponse("Server Error!", 500));
  }
  res.status(201).json({ success: true, data });
});

export const updateClothes = asyncHandler(async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  if (
    !body.category ||
    !body.type ||
    !body.color ||
    !body.seasons ||
    !body.occasion ||
    !body.img ||
    !body.energyLevel
  ) {
    return next(new ErrorResponse("Invalid input!", 400));
  }

  const data = await Clothes.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!data) {
    return next(new ErrorResponse("User not found!", 404));
  }

  res.status(200).json({ success: true, data });
});

export const deleteClothes = asyncHandler(async (req, res) => {
  const {
    params: { id },
  } = req;

  if (!id) {
    return next(new ErrorResponse("Invalid input!", 400));
  }

  const data = await Clothes.findByIdAndDelete(id);

  if (!data) {
    return next(new ErrorResponse("User not found!", 404));
  }
  res
    .status(200)
    .json({ success: true, data: { message: "Clothes was deleted!" } });
});
