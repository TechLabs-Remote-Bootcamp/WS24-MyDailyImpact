import Meal from './models/Meal.js';
import { ApiError } from '../utils/errorHandler.js';

export const getAllMeals = async (req, res) => {
    try {
        const meals = await Meal.find({});
        res.json(meals);
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'Server Error', error.message);
    }
};

export const getMealById = async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.mealId);

        if (!meal) {
            throw new ApiError(404, 'Meal not found');
        }

        res.json(meal);
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'Server Error', error.message);
    }
};

export const createMeal = async (req, res) => {
    const { name, ingredients, category } = req.body;
    const mealExists = await Meal.findOne({ name });
    if (mealExists) {
        throw new ApiError(400, 'Meal already exists');
    };
    let meal;
    try {
        meal = await Meal.create({
            name,
            ingredients,
            category
        });
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'Error creating meal', error.message);
    }
    res.status(201).json(meal);
}

export const updateMeal = async (req, res) => {
    try {
        const { name, ingredients, category } = req.body;
        const updatedMeal = await Meal.findByIdAndUpdate(req.params.mealId, {
            name,
            ingredients,
            category
        }, { new: true });
        if (!updatedMeal) {
            throw new ApiError(404, 'Meal not found');
        }
        res.json(updatedMeal);
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'Server Error', error.message);
    }
}

export const deleteMeal = async (req, res) => {
    try {
        const deletedMeal = await Meal.findByIdAndDelete(req.params.mealId);
        if (!deletedMeal) {
            throw new ApiError(404, 'Meal not found');
        }
        res.json(deletedMeal);
    } catch (error) {
        console.error(error);
        throw new ApiError(500, 'Server Error', error.message);
    }
}
