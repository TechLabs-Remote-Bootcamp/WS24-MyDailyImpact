import { validationResult } from 'express-validator';
import User from '../models/User.js';
import generateToken from '../../frontend/src/utils/generateToken.js';
import { ApiError } from '../../frontend/src/utils/errorHandler.js';

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, 'Validation failed', errors.array());
  }

  const { salutation, email, password, firstName, lastName, birthday, gender, country } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  let user;
  try {
    user = await User.create({
      salutation,
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
      salutation: user.salutation,
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
      salutation: user.salutation,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthday: user.birthday,
      gender: user.gender,
      country: user.country
    },
  });
};