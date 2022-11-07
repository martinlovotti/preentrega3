import {Router} from 'express';
import auth from '../middleware/auth.js';
import {usersDao} from '../contenedores/daos/index.js';

//declaro el router
const sessions = Router();

//importo el logger
import {logger} from '../logs/logger.js';


sessions.get("/", auth, async (req, res) => {

  const { method } = req;
  const time = new Date().toLocaleString();
  logger.info(`Ruta '/sessions' - con metodo: ${method} - time: ${time}`);

  const datosUsuario = await usersDao.getById(req.user._id); //busco el usuario en la base de datos, y guardo los datos en una variable el req.user_id es el id del usuario que se guarda en la session
  const user = datosUsuario.username;  //guardo el nombre de usuario en una variable
  res.status(201).json({data: user})

});


export  {sessions};

