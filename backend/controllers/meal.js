import Meal from '../models/Meal.js';
import { ApiError } from '../utils/errorHandler.js';

export const getAllMeals = async (req, res, next) => {
    try {
        const meals = await Meal.find({});
        res.json(meals);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'Server Error', error.message));
    }
};

export const getMealById = async (req, res, next) => {
    try {
        const meal = await Meal.findById(req.params.mealId);

        if (!meal) {
            throw new ApiError(404, 'Meal not found');
        }

        res.json(meal);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'Server Error', error.message));
    }
};

export const createMeal = async (req, res, next) => {
    try {
        const { name, ingredients, category } = req.body;
        const mealExists = await Meal.findOne({ name });
        if (mealExists) {
            return next(new ApiError(400, 'Meal already exists'));
        }
        
        const meal = await Meal.create({
            name,
            ingredients,
            category
        });
        
        res.status(201).json(meal);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'Error creating meal', error.message));
    }
};

export const updateMeal = async (req, res, next) => {
    try {
        const { name, ingredients, category } = req.body;
        const updatedMeal = await Meal.findByIdAndUpdate(req.params.mealId, {
            name,
            ingredients,
            category
        }, { new: true });
        if (!updatedMeal) {
            return next(new ApiError(404, 'Meal not found'));
        }
        res.json(updatedMeal);
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'Server Error', error.message));
    }
};

export const deleteMeal = async (req, res, next) => {
    try {
        const deletedMeal = await Meal.findByIdAndDelete(req.params.mealId);
        if (!deletedMeal) {
            return next(new ApiError(404, 'Meal not found'));
        }
        res.json({ message: 'Meal deleted successfully'  });
    } catch (error) {
        console.error(error);
        next(new ApiError(500, 'Server Error', error.message));
    }
};
