const express = require('express');
const Feedback = require('../models/Feedback');
const VisitCount = require('../models/VisitCount');
const router = express.Router();

//http://localhost:5000/api/feedback/

// Create Feedback
router.post('/feedback', async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({
            success: true,
            message: 'Feedback created successfully',
            data: feedback
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create feedback',
            error: error.message
        });
    }
});

// Read all Feedback
router.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Feedback
router.put('/feedback/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
        res.json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Feedback
router.delete('/feedback/:id', async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





// Track Visitor Count
router.post('/visit', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let visitCount = await VisitCount.findOne();
        if (!visitCount) {
            visitCount = new VisitCount();
        }

        visitCount.totalCount += 1;
        
        const todayVisit = visitCount.visitHistory.find(v => 
            v.date.getTime() === today.getTime()
        );

        if (todayVisit) {
            todayVisit.count += 1;
        } else {
            visitCount.visitHistory.push({ date: today, count: 1 });
        }

        visitCount.todayVisitCount = {
            date: today,
            count: todayVisit ? todayVisit.count + 1 : 1
        };

        visitCount.monthlyCount.count = visitCount.visitHistory.reduce((sum, v) => 
            v.date.getMonth() === today.getMonth() && v.date.getFullYear() === today.getFullYear() ? sum + v.count : sum
        , 0);

        visitCount.yearlyCount.count = visitCount.visitHistory.reduce((sum, v) => 
            v.date.getFullYear() === today.getFullYear() ? sum + v.count : sum
        , 0);

        await visitCount.save();

        res.status(200).json(visitCount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// Get Visitor Count
router.get('/visit-stats', async (req, res) => {
    try {
        const visitCount = await VisitCount.findOne();

        if (!visitCount) {
            return res.status(404).json({ message: 'No visit data found' });
        }

        res.status(200).json({
            totalCount: visitCount.totalCount,
            todayVisitCount: visitCount.todayVisitCount,
            monthlyCount: visitCount.monthlyCount,
            yearlyCount: visitCount.yearlyCount,
            createdAt: visitCount.createdAt,
            updatedAt: visitCount.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
