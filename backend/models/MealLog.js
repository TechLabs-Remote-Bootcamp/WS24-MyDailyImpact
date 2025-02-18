import mongoose from 'mongoose';

const mealLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mealName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner'],
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true,
  collection: 'meal_logs'
});

const MealLog = mongoose.model('MealLog', mealLogSchema);

export default MealLog;