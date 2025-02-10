import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Meal name is required'],
    trim: true
  },
  ingredients: {
    type: [String],
    default: [],
  },
  category: {
    type: String, 
    enum: ['Breakfast', 'Lunch', 'Dinner'],
    required: true
  }
}, {
  timestamps: true,
  collection: 'meals'
});

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;