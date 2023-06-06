const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const DB_URL = process.env.ATLASDB_URL
//"mongodb://127.0.0.1:27017/movies_server"



const connect = async()=>{
    try {
        const db = await mongoose.connect(DB_URL);
        const {name,host} = db.connection;
        console.log(`Conectado a ${name} en el host: ${host}`);
    } catch (error) {
        console.log("Error al conectar a la BBDD", error)
    }
   
}

module.exports = {connect,DB_URL};