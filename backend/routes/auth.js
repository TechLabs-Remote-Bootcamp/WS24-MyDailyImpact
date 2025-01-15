import express from 'express';
import { check } from 'express-validator';
import { register, login } from '../controllers/auth.js';
import asyncHandler from '../../frontend/src/utils/asyncHandler.js';

const router = express.Router();

router.post(
  '/register',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
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