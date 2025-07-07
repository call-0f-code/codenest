
const UserProgress = require("../models/userProgress");

// GET progress for a specific user and module
exports.getUserProgress = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const userId = req.user.id;

    const progress = await UserProgress.findOne({ userId, moduleId });

    res.status(200).json({
      success: true,
      completedQuestions: progress?.completedQuestions || [],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching progress" });
  }
};

// UPDATE or CREATE progress entry
exports.updateUserProgress = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { completedQuestions } = req.body;
    const userId = req.user.id;

    const progress = await UserProgress.findOneAndUpdate(
      { userId, moduleId },
      { completedQuestions },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      progress,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating progress" });
  }
};
