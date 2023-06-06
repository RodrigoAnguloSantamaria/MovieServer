const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema(
    {
        title: {type:String, required:true},
        director: {type:String, required:true},
        year: {type:Number, required:false},
        genre: {type:String, required:true}
    },{
        timestamps:true //genera fecha de creaccion y modificacion
    }
)

const Movie = mongoose.model("movie", movieSchema);
module.exports = Movie;