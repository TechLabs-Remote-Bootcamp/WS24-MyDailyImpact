import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../../server/models/user.js';
import connectDB from '../../server/config/db.js';

dotenv.config();

async function viewUsers() {
  try {
    await connectDB();
    
    // Find all users
    const users = await User.find({}).select('+password');
    
    console.log('\nRegistered Users:');
    console.log('================');
    
    users.forEach(user => {
      console.log(`\nUser ID: ${user._id}`);
      console.log(`Name: ${user.name}`);
      console.log(`Email: ${user.email}`);
      console.log(`Role: ${user.role}`);
      console.log(`Created: ${user.createdAt}`);
      console.log(`Last Updated: ${user.updatedAt}`);
      console.log(`Last Login: ${user.lastLogin || 'Never'}`);
      console.log('----------------');
    });
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error viewing users:', error);
  }
}

// Run the function
viewUsers();