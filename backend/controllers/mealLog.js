import UserMealLog from "../models/UserMealLog.js";
import { ApiError } from '../utils/errorHandler.js';

export const getAllUserMealLogs = async (req, res, next) => {
  try {
    const userMealLogs = await UserMealLog.find({});
    res.json(userMealLogs);
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error fetching all user meal logs', error.message));
  }
};

export const getUserMealLogs = async (req, res, next) => {
  try {
    const userMealLogs = await UserMealLog.find({ user: req.params.userId });
    res.json(userMealLogs);
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error fetching user meal logs', error.message));
  }
};

export const getMealLogs = async (req, res, next) => {
  try {
    const userMealLogs = await UserMealLog.find({ meal: req.params.mealId });
    res.json(userMealLogs);
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error fetching meal logs', error.message));
  }
};

export const createUserMealLog = async (req, res, next) => {
  try {
    const newUserMealLog = new UserMealLog(req.body);
    const savedUserMealLog = await newUserMealLog.save();
    res.status(201).json(savedUserMealLog);
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error creating user meal log', error.message));
  }
};

export const updateUserMealLog = async (req, res, next) => {
  try {
    const updatedUserMealLog = await UserMealLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUserMealLog) {
      return next(new ApiError(404, 'User meal log not found'));
    }

    res.json(updatedUserMealLog);
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error updating user meal log', error.message));
  }
};

export const deleteUserMealLog = async (req, res, next) => {
  try {
    const deletedUserMealLog = await UserMealLog.findByIdAndDelete(req.params.id);

    if (!deletedUserMealLog) {
      return next(new ApiError(404, 'User meal log not found'));
    }

    res.json(deletedUserMealLog);
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error deleting user meal log', error.message));
  }
};