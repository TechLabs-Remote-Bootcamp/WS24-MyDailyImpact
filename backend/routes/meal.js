import express from 'express';
import { check } from 'express-validator';
import {
    getAllMeals,
    getMealById,
    createMeal,
    updateMeal,
    deleteMeal,
} from '../controllers/meal.js';

const mealRouter = express.Router();

mealRouter.get('/', getAllMeals);

mealRouter.get('/:mealId', getMealById);

mealRouter.post('/', 
    [
        check('name', 'Name is required').notEmpty(),
        check('ingredients', 'Ingredients are required').notEmpty(),
        check('category', 'Category is required').notEmpty(),
    ],
    createMeal);

mealRouter.put('/:mealId', 
    [
        check('name', 'Name is required').notEmpty(),
        check('ingredients', 'Ingredients are required').notEmpty(),
        check('category', 'Category is required').notEmpty(),
    ],
    updateMeal);

mealRouter.delete('/:mealId', deleteMeal);

export default mealRouter;
