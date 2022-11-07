import {Router} from 'express';
import auth from '../middleware/auth.js';
const home = Router();

//importo el logger
import {logger} from '../logs/logger.js';

//importo los controllers
import {productosDao} from '../contenedores/daos/index.js';
import {usersDao} from '../contenedores/daos/index.js';
import {carritosDao} from '../contenedores/daos/index.js';


home.get("/", auth, async (req, res) => {
  const {method} = req;
  const time = new Date().toLocaleString();  

  const carts = await carritosDao.list()
  const cart = carts.find(el => el.userId == req.user._id) 

  if (!cart) {
    const newCart = await carritosDao.save(req.user._id)    
    const productos = await productosDao.list();    
    const datosUsuario = await usersDao.getById(req.user._id);    
    logger.info(`Ruta '/' - con metodo: ${method} - time: ${time}`);
    res.render("home", { //renderizo la vista home, y le paso el nombre de usuario
      userData : datosUsuario,
      productos,
      cart: newCart
    });

  } else {
    const productos = await productosDao.list();
    const datosUsuario = await usersDao.getById(req.user._id);  
    logger.info(`Ruta '/' - con metodo: ${method} - time: ${time}`);
    res.render("home", { //renderizo la vista home, y le paso el nombre de usuario
      userData : datosUsuario,      
      productos,
      cart   
    });
  }

});


export { home };