import express from "express";
import {
  getAllUserMealLogs,
  getUserMealLogs,
  getMealLogs,
  createUserMealLog,
  updateUserMealLog,
  deleteUserMealLog
} from "../controllers/mealLog.js";

const userMealLogRouter = express.Router();

userMealLogRouter.get("/", getAllUserMealLogs);
userMealLogRouter.get("/user/:userId", getUserMealLogs);
userMealLogRouter.get("/meal/:mealId", getMealLogs);
userMealLogRouter.post("/", createUserMealLog);
userMealLogRouter.put("/:id", updateUserMealLog);
userMealLogRouter.delete("/:id", deleteUserMealLog);

export default userMealLogRouter;