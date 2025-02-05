import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Meal from '../models/Meal.js';

dotenv.config();

const sampleMeals = [
  {
    name: "Vegan Breakfast Bowl",
    ingredients: ["Oats", "Almond milk", "Banana", "Chia seeds", "Berries"],
    category: "Breakfast"
  },
  {
    name: "Quinoa Salad",
    ingredients: ["Quinoa", "Cucumber", "Tomatoes", "Olive oil", "Lemon juice"],
    category: "Lunch"
  },
  {
    name: "Lentil Curry",
    ingredients: ["Lentils", "Coconut milk", "Curry powder", "Onion", "Garlic"],
    category: "Dinner"
  },
  {
    name: "Fruit and Nut Mix",
    ingredients: ["Almonds", "Walnuts", "Dried cranberries", "Raisins"],
    category: "Snack"
  },
  {
    name: "Avocado Toast",
    ingredients: ["Whole grain bread", "Avocado", "Cherry tomatoes", "Lemon juice", "Salt"],
    category: "Breakfast"
  },
  {
    name: "Vegetable Stir Fry",
    ingredients: ["Tofu", "Broccoli", "Carrots", "Soy sauce", "Ginger"],
    category: "Dinner"
  }
];

const seedMeals = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Meal.deleteMany({});
    console.log('Cleared existing meals');

    const createdMeals = await Meal.insertMany(sampleMeals);
    console.log(`${createdMeals.length} meals created`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding meals:', error);
    process.exit(1);
  }
};

seedMeals();