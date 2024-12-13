const Movie = require('../models/Movie');

// Add Movie (Admin only)
exports.addMovie = async (req, res) => {
    const movieData = req.body;
    
    try {
        const movie = new Movie(movieData);
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: 'Error adding movie.' });
    }
};

// Get All Movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json({ movies });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movies.' });
    }
};

// Get Movie by ID
exports.getMovieById = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ error: 'Movie not found.' });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movie.' });
    }
};

// Update Movie (Admin only)
exports.updateMovie = async (req, res) => {
    const { id } = req.params;
    
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ error: 'Movie not found.' });
        
        res.json({
            message: "Movie updated successfully",
            updatedMovie,
        });
    } catch (error) {
        res.status(400).json({ error: 'Error updating movie.' });
    }
};

// Delete Movie (Admin only)
exports.deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
        await Movie.findByIdAndDelete(id);
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting movie.' });
    }
};

// Add Comment to Movie
exports.addComment = async (req, res) => {
    const { id } = req.params;
    
    try {
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ error: 'Movie not found.' });

        movie.comments.push({ userId: req.userId, comment: req.body.comment });
        await movie.save();

        res.json({
            message: "Comment added successfully",
            updatedMovie: movie,
        });
    } catch (error) {
        res.status(400).json({ error: 'Error adding comment.' });
    }
};

// Get Comments for a Movie
exports.getComments = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findById(id).select('comments');
        if (!movie) return res.status(404).json({ error: 'Movie not found.' });

        res.json({ comments: movie.comments });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comments.' });
    }
};
