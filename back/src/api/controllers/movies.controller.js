const Movie = require("../models/movie.model");
const {isAuth} = require("../../middlewares/auth")

// get all the movies
const getMovies = async (req, res)=>{
    try {
        const allMovies = await Movie.find();
        return res.status(200).json(allMovies);
    } catch (error) {
        return res.status(500).json(error);
    }
}
// get movies by id
const getMoviesById = async (req, res)=>{
    try {
        const {id} = req.params;

        const allMoviesById = await Movie.find({_id: id}, "title director year");
        return res.status(200).json(allMoviesById);
    } catch (error) {
        return res.status(500).json(error);
    }
}
// get movies by title
const getMoviesByTitle = async (req, res)=>{
    try {
        const {title} = req.params;
        //console.log(title)
        const allMoviesByTitle = await Movie.find({title: title}, "_id title director year");
        if (allMoviesByTitle.length == 0){
            return res.status(404).json({message: `el titulo ${title} no existe`})
        }
        return res.status(200).json(allMoviesByTitle);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// get movies by genre
const getMoviesByGenre = async (req, res)=>{
    try {
        const {genre} = req.params;
        //console.log(genre)
        const allMoviesByGenre = await Movie.find({genre: genre}, "_id title director year genre");
        if (allMoviesByGenre.length === 0){
            return res.status(404).json({message: `el genero ${genre} no existe`})
        }
        return res.status(200).json(allMoviesByGenre);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// get movies premiere after 2010
const getMoviesAfter2010 = async (req, res) =>{
    try {
        const moviesAfter2010 = await Movie.find({year:{$gt:2010}});
        if (moviesAfter2010.length === 0){
            return res.status(404).json({message: "No hay peliculas estrenadas en 2010 o posteriores"})
        }
        return res.status(200).json(moviesAfter2010);
    } catch (error) {
        return res.status(500).json(error)   
    }
}

// post one movie - insertOne
const postMovie = async (req, res)=>{
    
    try {
        const newMovie = new Movie(req.body);
        
        const createdMovie = await newMovie.save();
        console.log("createdmovie: "+createdMovie+" respuesta: "+res.statusCode)
        return res.status(201).json(createdMovie);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// put modify one - checked by _id
const putMovie = async (req, res)=>{
    try {
        const {id} = req.params;
        const putMovie = new Movie(req.body);
        putMovie._id = id;
        const updateMovie = await Movie.findByIdAndUpdate(id, putMovie,{new:true});
        if (!updateMovie){
            return res.status(404).json({mesage: "el id no existe"})
        }
        return res.status(200).json(updateMovie);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// delete movie -- checked by id
const deleteMovie = async (req,res) =>{
    try {
        const {id} = req.params;
        console.log(id)
        const deleteMovie = await Movie.findByIdAndDelete(id);
        if (!deleteMovie){
            return  res.status(404).json({message: `no existe movie con id ${id} para eliminar`});
        }
        return res.status(200).json(deleteMovie)
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getMovies,postMovie,putMovie,deleteMovie,getMoviesById,getMoviesByTitle,getMoviesByGenre,getMoviesAfter2010}