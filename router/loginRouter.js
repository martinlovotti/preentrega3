import {Router} from 'express';
//import auth from '../middleware/auth.js';
import passport from '../middleware/passport.js'; 

//declaro el router
const login = Router();

//importo el logger
import {logger} from '../logs/logger.js';


login.get("/", (req, res) => { 

  const {method} = req; 
  const time = new Date().toLocaleString();
  logger.info(`Ruta '/login' - con metodo: ${method} - time: ${time}`);
  res.render('login'); 

});


login.post("/", passport.authenticate("local", { failureRedirect: "/loginerror" }),
  
  (req, res) => {
    const {method} = req;
    const time = new Date().toLocaleString();
    logger.info(`Logueo Exitoso --> Ruta '/login' - con metodo: ${method} - time: ${time}`);
    
    res.redirect("/");
  }
);


export  {login};

