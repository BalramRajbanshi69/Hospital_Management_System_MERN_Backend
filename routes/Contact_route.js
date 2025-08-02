const express = require("express");
const router = express.Router();
const Contact = require('../models/Contact_model');
const FetchUser = require("../middleware/FetchUser");
const { sendEmail } = require("../services/sendEmail");


// Contact form submission route with validation
router.post(
  "/",
  FetchUser,
  async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Create a new Contact document
      const newContact = new Contact({
        user:req.user.id,
        name,
        email,
        subject,
        message,
      });

      // Save to database
      await newContact.save();

      await sendEmail({
         name,
        email,
        subject,
        message,
      })

      res.status(201).json({
        success: true,
        contact: newContact,
        message: "Contact form submitted successfully!"
      });

    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }
);

module.exports = router;


