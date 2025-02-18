import express from "express";
import {
  createMealLog,
  getUserMealLogs
} from "../controllers/mealLog.js";

const userMealLogRouter = express.Router();

userMealLogRouter.post("/", createMealLog);
userMealLogRouter.get("/:userId", getUserMealLogs);

export default userMealLogRouter;