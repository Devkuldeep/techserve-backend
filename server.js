const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const feedbackRoutes = require('./routes/feedbackRoutes');
const contactRoutes = require('./routes/contactRoutes');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 5000;






// Middleware
app.use(cors({
    origin: 'http://localhost:3000' // or whatever port your Next.js app is running on
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', feedbackRoutes);
app.use('/api', contactRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the TecBack API!');
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
