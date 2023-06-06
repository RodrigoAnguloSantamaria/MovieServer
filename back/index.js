
const express = require("express");
//const bodyParser = require('body-parser')
const dotenv = require("dotenv").config();// si require dotenv en lineas mas abajo de {connect} falla conexion a BBDD
const { connect } = require("./src/utils/db");
const {isAuth} = require("./src/middlewares/auth")
const moviesRoutes = require("./src/api/routes/movies.routes");
const cinemasRoutes = require("./src/api/routes/cinemas.routes");
const usersRouter = require('./src/api/routes/users.routes');
const cors = require("cors");




const PORT = process.env.PORT;
const app = express();

connect();
app.use(cors());

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
//   })
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, PATCH'); //Decimos que metodos tenemos permitidos
    res.header('Access-Control-Allow-Credentials', 'true'); //permitimos la conexión con credenciales(Bearer token)
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // permitimos los headers del tipo Content-Type
    next();
  })


app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/movies", isAuth, moviesRoutes);
app.use("/cinemas",cinemasRoutes);
app.use('/users', usersRouter);

console.log(process.env.DB_URL)
app.listen(PORT,()=>console.log(`nuevo servidor escuchando en puerto: ${PORT}  -- muestra en consola`))
