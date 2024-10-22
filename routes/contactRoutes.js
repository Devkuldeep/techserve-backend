const express = require('express');
const router = express.Router();
const ProjectInquiry = require('../models/ProjectInquiry');

// POST route to handle form submissions
router.post('/submit-inquiry', async (req, res) => {
    try {
        // Create a new inquiry document using the request body
        const inquiry = new ProjectInquiry(req.body);
        
        // Save the document to the database
        await inquiry.save();
        
        // Respond with success message
        res.status(201).json({ message: 'Inquiry submitted successfully!' });
    } catch (error) {
        // Handle validation errors or any other issues
        res.status(400).json({ error: error.message });
    }
});

// GET route to retrieve all inquiries
router.get('/inquiries', async (req, res) => {
    try {
        // Retrieve all inquiries from the database
        const inquiries = await ProjectInquiry.find();
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to retrieve a single inquiry by ID
router.get('/inquiries/:id', async (req, res) => {
    try {
        const inquiry = await ProjectInquiry.findById(req.params.id);
        
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        res.status(200).json(inquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT route to update an inquiry by ID
router.put('/inquiries/:id', async (req, res) => {
    try {
        const inquiry = await ProjectInquiry.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Validate on update
        });

        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        res.status(200).json({ message: 'Inquiry updated successfully', inquiry });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE route to remove an inquiry by ID
router.delete('/inquiries/:id', async (req, res) => {
    try {
        const inquiry = await ProjectInquiry.findByIdAndDelete(req.params.id);
        
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        res.status(200).json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

