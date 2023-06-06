const express = require("express");

const {getMovies,postMovie,putMovie,deleteMovie,getMoviesById,getMoviesByTitle,getMoviesByGenre,getMoviesAfter2010}=require("../controllers/movies.controller");


const moviesRoutes = express.Router();

// endpoint for all the movies
moviesRoutes.get("/",getMovies);

// endpoint for one  movies by id
moviesRoutes.get("/:id",getMoviesById);

// endpoint for one  movies by title
moviesRoutes.get("/title/:title",getMoviesByTitle);

// endpoint for one  movies by genre
moviesRoutes.get("/genre/:genre",getMoviesByGenre);

// endpoint for movies after XX year of premier
moviesRoutes.get("/year/2010",getMoviesAfter2010);

//endpoint for insert one movie
moviesRoutes.post("/", postMovie);

// endpoint for update movie adding /:id of existing film
moviesRoutes.put("/:id",putMovie);

// endpoint for delete movie adding /:id of movie to remove
moviesRoutes.delete("/:id",deleteMovie);

module.exports = moviesRoutes;