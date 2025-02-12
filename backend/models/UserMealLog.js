import mongoose from 'mongoose';

const userMealLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mealId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
    required: true
  },
  mealName: {
    type: String,
    trim: true,
    required: true,
    default: ''
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
  collection: 'user_meal_logs'
});

const UserMealLog = mongoose.model('UserMealLog', userMealLogSchema);

export default UserMealLog;