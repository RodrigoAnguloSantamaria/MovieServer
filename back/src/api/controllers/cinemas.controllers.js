const Cinema = require("../models/cinema.model");

// get all the cinemas
const getCinemas = async (req, res)=>{
    try {
        const allCinemas = await Cinema.find().populate("allMovies","title year");  
        //res.send("estoy en get cinemas")

      
        return res.status(200).json(allCinemas);
        if (allCinemas.length === 0){
            res.send("No existen cinemas a mostrar")
        }
        
    } catch (error) {
        return res.status(500).json({message:`error de servidor ${error}`});
    }
}
// get  cinema by id
const getCinemaById = async (req, res)=>{
    try {
        const {id} = req.params;
        const cinemaById = await Cinema.find({_id:id}).populate("allMovies","title year");  
        //res.send("estoy en get cinemas")

        if (cinemaById.length === 0){
            res.send("No existen cinemas a mostrar")
        }
        
        return res.status(200).json(cinemaById);

        
    } catch (error) {
        return res.status(500).json({message:`error de servidor ${error}`});
    }
}

// post one cinema - insertOne
const postCinema = async (req, res)=>{
    try {
        const newCinema = new Cinema(req.body);
        const createCinema = await newCinema.save();
        if (!res.status(201)){
            res.send({message:"No se ha creado bien el cinema"})
        }
        return res.status(201).json(createCinema);
    } catch (error) {
        return res.status(500).json({message:`error de servidor ${error}`});
    }
}

// put modify one - checked by _id
const putCinema = async (req, res)=>{
    try {
        const {id} = req.params;
        const putCinema = new Cinema(req.body);
        putCinema._id = id;
        const updateCinema = await Cinema.findByIdAndUpdate(id, putCinema,{new:true});
        if (!updateCinema){
            return res.status(404).json({mesage: "el id no existe"})
        }
        return res.status(200).json(updateCinema);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// delete cinema by id
const deleteCinema = async (req,res) =>{
    try {
        const {id} = req.params;
        console.log(id)
        const deleteCinema = await Cinema.findByIdAndDelete(id);
        if (!deleteCinema){
            return  res.status(404).json({message: `no existe cinema con id ${id} para eliminar`});
        }
        return res.status(200).json(deleteCinema)
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getCinemas,postCinema,deleteCinema,putCinema,getCinemaById};