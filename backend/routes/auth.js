import express from 'express';
import { check } from 'express-validator';
import { register, login } from '../controllers/auth.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.post(
  '/register',
  [
    check('firstName', 'First Name is required').notEmpty(),
    check('lastName', 'Last Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('birthday', 'Birthday is required').notEmpty().isISO8601().toDate(),
    check('gender', 'Gender is required').notEmpty().isIn(['male', 'female', 'other']),
    check('country', 'Country is required').notEmpty()
  ],
  asyncHandler(register)
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  asyncHandler(login)
);

export default router;