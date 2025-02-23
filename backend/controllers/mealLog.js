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

export const updateMealLog = async (req, res, next) => {
  try {
    const updatedMealLog = await MealLog.findByIdAndUpdate(
      req.params.mealLogId,
      req.body,
      { new: true }
    );

    if (!updatedMealLog) {
      return next(new ApiError(404, 'Meal log not found'));
    }

    res.json({
      message: 'Meal log updated successfully',
      mealLog: updatedMealLog
    });
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error updating meal log', error.message));
  }
}
export const deleteMealLog = async (req, res, next) => {
  try {
    const deletedMealLog = await MealLog.findByIdAndDelete(req.params.mealLogId);

    if (!deletedMealLog) {
      return next(new ApiError(404, 'Meal log not found'));
    }

    res.json({ message: 'Meal log deleted successfully' });
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error deleting meal log', error.message));
  }
};
