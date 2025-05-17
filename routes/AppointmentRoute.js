const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment_model');
const FetchUser = require('../middleware/FetchUser');

// Create new appointment
router.post('/book-appointments', FetchUser, async (req, res) => {
    try {

        const appointment = new Appointment({
            user: req.user.id,
            ...req.body
        });

        const savedAppointment = await appointment.save();
        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
            appointment: savedAppointment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to book appointment',
            error: error.message
        });
    }
});



// Get all appointments
router.get('/book-appointments', FetchUser, async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .sort({ date: -1, time: -1 });
        
        res.json({
            success: true,
            appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointments',
            error: error.message
        });
    }
});

// Get all appointments for logged-in user
router.get('/loggedin-appointments', FetchUser, async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id })
            .sort({ date: -1, time: -1 });
        
        res.json({
            success: true,
            appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointments',
            error: error.message
        });
    }
});

// Get single appointment
router.get('/book-appointments/:id', FetchUser, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        // Check if appointment belongs to logged-in user
        if (appointment.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        res.json({
            success: true,
            appointment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointment',
            error: error.message
        });
    }
});



//Update appointment
router.put('/book-appointments/:id', FetchUser, async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const { name, email, phone, gender, date, time, doctor, department, message } = req.body;

        // Check if appointment exists
        let appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        // Verify ownership
        if (appointment.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        // Create update object with only provided fields
        const updatedAppointment = {};
        if (name) updatedAppointment.name = name;
        if (email) updatedAppointment.email = email;
        if (phone) updatedAppointment.phone = phone;
        if (gender) updatedAppointment.gender = gender;
        if (date) updatedAppointment.date = date;
        if (time) updatedAppointment.time = time;
        if (doctor) updatedAppointment.doctor = doctor;
        if (department) updatedAppointment.department = department;
        if (message) updatedAppointment.message = message;

        // Update appointment
        const updatedDoc = await Appointment.findByIdAndUpdate(
            appointmentId,
            { $set: updatedAppointment },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Appointment updated successfully',
            appointment: updatedDoc
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Failed to update appointment',
            error: error.message
        });
    }
});



// Delete appointment
router.delete('/book-appointments/:id', FetchUser, async (req, res) => {
    try {
        let appointment = await Appointment.findById(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        // Verify ownership
        if (appointment.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            });
        }

        await Appointment.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Appointment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete appointment',
            error: error.message
        });
    }
});



module.exports = router;