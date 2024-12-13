const express = require('express');
const authenticateToken = require('../middleware/auth');
const {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  addComment,
  getComments,
} = require('../controllers/MovieController');

const router = express.Router();

// Admin routes - protected by auth middleware 
router.post('/addMovie', authenticateToken, addMovie); // Admin only 
router.patch('/updateMovie/:id', authenticateToken, updateMovie); // Admin only 
router.delete('/deleteMovie/:id', authenticateToken, deleteMovie); // Admin only 

// Public routes 
router.get('/getMovies', getAllMovies); 
router.get('/getMovie/:id', getMovieById); 
router.post('/addComment/:id', authenticateToken, addComment); 
router.get('/getComments/:id', getComments); 

module.exports = router;
