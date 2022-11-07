import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();


//para poder utilizar __dirname y obtener los archivos publicos
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//inicializa express
const app = express();


//inicioalizo MongoAtlas
import MongoStore from 'connect-mongo';
/* const MongoStore = require("connect-mongo"); */
const advanceOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


//inicializo conexion a la base de datos para las sessiones
app.use(cookieParser());
let mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';


//middleware para manejar las sesiones
app.use(

  session({
    store: new MongoStore({ 
      mongoUrl: mongoUrl,
      mongoOptions: advanceOptions   
    }),
    secret: "coderhouse",
    resave: true,
    saveUninitialized: true,
    rolling: true, //cada vez que se hace una petición se renueva el tiempo de expiración
    cookie: { maxAge: 60000000 }, //tiempo de expiración de la cookie
    //cookie: { maxAge: 60000 }, //tiempo de expiración de la cookie
  })

);


//middleware para inicializar passport y unir session con passport
app.use(passport.initialize());
app.use(passport.session());


//importo el router (index.js)
import {router} from './router/index.js';


//seteo de plantilla
app.set('views', './views');
app.set('view engine', 'ejs');


//middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json()); //para poder recibir json
app.use(express.urlencoded({ extended: true })); //para poder recibir datos de formularios
app.use("/", router);


//levanto el servidor
const port = process.env.PORT || 8080;


const server = app.listen(port, () => {
  console.log(`Servidor escuchando el puerto: ${server.address().port}`);
});


server.on("error", (error) => `El servidor a tenido un error:${error}`);
