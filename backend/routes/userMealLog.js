import express from "express";
import {
  createMealLog,
  getUserMealLogs,
  updateMealLog,
  deleteMealLog,
} from "../controllers/mealLog.js";

const userMealLogRouter = express.Router();

userMealLogRouter.post("/", createMealLog);
userMealLogRouter.get("/:userId", getUserMealLogs);
userMealLogRouter.put("/meal/:mealLogId", updateMealLog);
userMealLogRouter.delete("/meal/:mealLogId", deleteMealLog);

export default userMealLogRouter;