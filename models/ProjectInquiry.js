const mongoose = require('mongoose');

// Define the schema for the project inquiry form
const ProjectInquirySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true, // Removes whitespace from beginning and end
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid'], // Basic email validation
        lowercase: true, // Automatically convert the email to lowercase
    },
    mobile: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Mobile number should be 10 digits'], // Validation for 10-digit mobile numbers
    },
    service: {
        type: String,
        required: true,
        enum: [
            'Web Development',
            'App Development',
            'UI/UX Design',
            'Video Production',
            'Digital Marketing',
            'Custom Solution'
        ], // Restricts the values to the listed services
    },
    message: {
        type: String,
        required: true,
        maxlength: 1000, // Limit the message to 1000 characters
    },
    submittedAt: {
        type: Date,
        default: Date.now, // Automatically set the submission date
    }
});

// Create a model using the schema
const ProjectInquiry = mongoose.model('ProjectInquiry', ProjectInquirySchema);

module.exports = ProjectInquiry;
