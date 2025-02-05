import UserMealLog from "../models/UserMealLog.js";

export const getAllUserMealLogs = async (req, res) => {
  try {
    const userMealLogs = await UserMealLog.find({});
    res.json(userMealLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserMealLogs = async (req, res) => {
  try {
    const userMealLogs = await UserMealLog.find({ user: req.params.userId });
    res.json(userMealLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMealLogs = async (req, res) => {
  try {
    const userMealLogs = await UserMealLog.find({ meal: req.params.mealId });
    res.json(userMealLogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createUserMealLog = async (req, res) => {
  try {
    const newUserMealLog = new UserMealLog(req.body);
    const savedUserMealLog = await newUserMealLog.save();
    res.json(savedUserMealLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateUserMealLog = async (req, res) => {
  try {
    const updatedUserMealLog = await UserMealLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUserMealLog) {
      return res.status(404).json({ message: "User meal log not found" });
    }

    res.json(updatedUserMealLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUserMealLog = async (req, res) => {
  try {
    const deletedUserMealLog = await UserMealLog.findByIdAndDelete(req.params.id);

    if (!deletedUserMealLog) {
      return res.status(404).json({ message: "User meal log not found" });
    }

    res.json(deletedUserMealLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};