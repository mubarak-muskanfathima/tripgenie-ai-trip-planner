const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    from: {
      type: String,
      required: true
    },

    destination: {
      type: String,
      required: true
    },

    days: {
      type: Number,
      required: true
    },

    travelers: {
      type: Number,
      required: true
    },

    budget: {
      type: Number,
      required: true
    },

    interests: {
      type: [String],
      default: []
    },

    aiResult: {
      type: Object,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Trip", tripSchema);