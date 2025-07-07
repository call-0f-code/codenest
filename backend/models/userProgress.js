const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
  completedQuestions: {
    type: [Number],
    default: [],
  },
}, {
  timestamps: true,
});

// ✅ Compound index to speed up lookups and ensure uniqueness
progressSchema.index({ userId: 1, moduleId: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);