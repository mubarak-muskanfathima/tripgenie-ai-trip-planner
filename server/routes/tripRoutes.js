const express = require("express");
const jwt = require("jsonwebtoken");
const Trip = require("../models/Trip");

const router = express.Router();


// Authentication middleware
const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Please login first."
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decoded.userId;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });
  }
};


// SAVE TRIP
router.post("/save", authenticateUser, async (req, res) => {
  try {
    const {
      from,
      destination,
      days,
      travelers,
      budget,
      interests,
      aiResult
    } = req.body;

    const trip = await Trip.create({
      userId: req.userId,
      from,
      destination,
      days,
      travelers,
      budget,
      interests,
      aiResult
    });

    res.status(201).json({
      success: true,
      message: "Trip saved successfully!",
      trip
    });

  } catch (error) {
    console.error("Save Trip Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to save trip."
    });
  }
});


// GET USER TRIPS
router.get("/my-trips", authenticateUser, async (req, res) => {
  try {
    const trips = await Trip.find({
      userId: req.userId
    }).sort({
      createdAt: -1
    });

    res.json({
      success: true,
      trips
    });

  } catch (error) {
    console.error("Get Trips Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load your trips."
    });
  }
});
// GET SINGLE TRIP
router.get("/:id", authenticateUser, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found."
      });
    }

    res.json({
      success: true,
      trip
    });

  } catch (error) {
    console.error("Get Single Trip Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to load trip."
    });
  }
});
// DELETE TRIP
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found."
      });
    }

    res.json({
      success: true,
      message: "Trip deleted successfully."
    });

  } catch (error) {
    console.error("Delete Trip Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete trip."
    });
  }
});

module.exports = router;