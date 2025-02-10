import { validationResult } from 'express-validator';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { ApiError } from '../utils/errorHandler.js';

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ApiError(400, 'Validation failed', errors.array()));
    }

    const { email, password, firstName, lastName, birthday, gender, country } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ApiError(400, 'User already exists'));
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      birthday,
      gender,
      country
    });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthday: user.birthday,
        gender: user.gender,
        country: user.country
      },
    });
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error registering user', error.message));
  }
};

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ApiError(400, 'Validation failed', errors.array()));
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return next(new ApiError(401, 'Invalid email or password'));
    }

    await user.updateLastLogin();

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthday: user.birthday,
        gender: user.gender,
        country: user.country
      },
    });
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error logging in', error.message));
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthday: user.birthday,
      gender: user.gender,
      country: user.country,
      role: user.role,
      lastLogin: user.lastLogin,
    });
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error fetching user profile', error.message));
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.birthday = req.body.birthday || user.birthday;
    user.gender = req.body.gender || user.gender;
    user.country = req.body.country || user.country;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      birthday: updatedUser.birthday,
      gender: updatedUser.gender,
      country: updatedUser.country,
    });
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error updating user profile', error.message));
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    if (!(await user.comparePassword(currentPassword))) {
      return next(new ApiError(401, 'Current password is incorrect'));
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error changing password', error.message));
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);

    if (!deletedUser) {
      return next(new ApiError(404, 'User not found'));
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    next(new ApiError(500, 'Error deleting account', error.message));
  }
};