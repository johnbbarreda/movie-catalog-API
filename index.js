require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const { handleError } = require('./middleware/errorHandler');

const app = express();

// Middleware setup 
app.use(cors());
app.use(express.json()); 

// Connect to MongoDB 
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Routes 
app.use('/users', userRoutes); 
app.use('/movies', movieRoutes); 

// Error handling middleware 
app.use(handleError);

// Start the server 
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => { 
   console.log(`Server is running on port ${PORT}`); 
});
