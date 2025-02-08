import mongoose from 'mongoose';

const userMealLogSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meal',
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