import MealLog from "../models/MealLog.js";
import { ApiError } from '../utils/errorHandler.js';

export const createMealLog = async (req, res, next) => {
  try {
    const { userId, mealName, category, date, notes } = req.body;

    const newMealLog = new MealLog({
      userId,
      mealName,
      category,
      date: date || Date.now(),
      notes
    });

    const savedMealLog = await newMealLog.save();

    res.status(201).json({
      message: 'Meal logged successfully',
      mealLog: savedMealLog
    });
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error logging meal', error.message));
  }
};

export const getUserMealLogs = async (req, res, next) => {
  try {
    const userMealLogs = await MealLog.find({ userId: req.params.userId })
      .sort({ date: -1 })
      .lean();

    if (userMealLogs.length === 0) {
      return res.status(404).json({ message: 'No meal logs found for this user' });
    }

    res.json({
      userId: req.params.userId,
      totalLogs: userMealLogs.length,
      meals: userMealLogs
    });
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error fetching user meal logs', error.message));
  }
};