const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },

  completedQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }]
}, { timestamps: true });

userProgressSchema.index({ user: 1, module: 1 }, { unique: true }); // Only one progress doc per user-module

module.exports = mongoose.model('UserProgress', userProgressSchema);
