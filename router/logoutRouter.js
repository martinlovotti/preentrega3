import {Router} from 'express';
import {usersDao} from '../contenedores/daos/index.js';

//declaro el router
const logout = Router();

//importo el logger
import {logger} from '../logs/logger.js';

logout.get("/", async (req, res) => {

  const datosUsuario = await usersDao.getById(req.user._id); //busco el usuario en la base de datos, y guardo los datos en una variable el req.user_id es el id del usuario que se guarda en la session
  const user = datosUsuario.username;  //guardo el nombre de usuario en una variable  

  req.session.destroy((err) => { //destruyo la session
    if (!err) {
      const {method} = req;
      const time = new Date().toLocaleString();
      logger.info(`Logout Exitoso --> Ruta '/logout' - con metodo: ${method} - time: ${time}`);

      res.render('logout', {user}); //si no hay error, renderizo la vista logout y le paso el parametro user
    }
    else res.send("Error");
  });

});


export  {logout};

