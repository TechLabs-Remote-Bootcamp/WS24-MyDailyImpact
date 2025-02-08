import { validationResult } from 'express-validator';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { ApiError } from '../utils/errorHandler.js';

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation failed', errors.array());
  }

  const { email, password, firstName, lastName, birthday, gender, country } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  let user;
  try {
    user = await User.create({
      firstName,
      lastName,
      email,
      password,
      birthday,
      gender,
      country
    });
  } catch (error) {
    throw new ApiError(500, 'Error creating user', error.message);
  }

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
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation failed', errors.array());
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
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
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
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
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
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
  } else {
    throw new ApiError(404, 'User not found');
  }
};