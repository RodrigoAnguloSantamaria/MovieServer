const express = require ("express")
const {getCinemas,postCinema,deleteCinema,putCinema,getCinemaById} = require("../controllers/cinemas.controllers");

const cinemasRoutes = express.Router();


cinemasRoutes.get("/",getCinemas);

cinemasRoutes.get("/:id",getCinemaById);

cinemasRoutes.post("/",postCinema);

cinemasRoutes.put("/:id",putCinema);

cinemasRoutes.delete("/:id",deleteCinema);

module.exports = cinemasRoutes;