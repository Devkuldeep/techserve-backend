const mongoose = require('mongoose');

const visitCountSchema = new mongoose.Schema({
    totalCount: {
        type: Number,
        required: true,
        default: 0,
    },
    visitHistory: [{
        date: {
            type: Date,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
    }],
    todayVisitCount: {
        date: {
            type: Date,
            required: true,
            default: () => {
                const now = new Date();
                return new Date(now.getFullYear(), now.getMonth(), now.getDate());
            },
        },
        count: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    monthlyCount: {
        month: {
            type: Number,
            required: true,
            default: () => new Date().getMonth() + 1,
        },
        year: {
            type: Number,
            required: true,
            default: () => new Date().getFullYear(),
        },
        count: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    yearlyCount: {
        year: {
            type: Number,
            required: true,
            default: () => new Date().getFullYear(),
        },
        count: {
            type: Number,
            required: true,
            default: 0,
        },
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('VisitCount', visitCountSchema);
