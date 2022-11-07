import {Router} from 'express';
import auth from '../middleware/auth.js';

//declaro el router
const products = Router();

//importo el logger
import {logger} from '../logs/logger.js';

//importo los controllers
import {productosDao} from '../contenedores/daos/index.js';
import {usersDao} from '../contenedores/daos/index.js';

//estructura Productos
//id, timestamp, nombre, descripcion, código, thumbnail, precio, stock.
//id, timestamp, name, description, code, thumbnail, price, stock
/* {    
    "name":"teclado",
    "description":"Teclado para PC",
    "code": "50E55",
    "thumbnail":"alguna url",
    "price":500,
    "stock":50
} */

products.get("/", auth, async (req, res) => {

  const { method } = req;
  const time = new Date().toLocaleString();

  const datosUsuario = await usersDao.getById(req.user._id); //busco el usuario en la base de datos, y guardo los datos en una variable el req.user_id es el id del usuario que se guarda en la session
  const user = datosUsuario.username;  //guardo el nombre de usuario en una variable

  if (user.toLowerCase() !== 'eneas') { //si el usuario no es admin, redirecciono a la ruta /unauthorized
    logger.info(`Acceso no Autorizado --> Ruta '/productos' - con metodo: ${method} - time: ${time}`);
    return res.render('unauthorized')
  }  

  const productos = await productosDao.list();

  logger.info(`Ruta '/productos' - con metodo: ${method} - time: ${time}`);
  
  res.render("products", { //renderizo la vista productos, y le paso los productos
    productos: productos
  });
});


products.get("/:id", auth, (req, res) => {  

  const { method } = req;
  const time = new Date().toLocaleString();
  logger.info(`Ruta '/productos/:id' - con metodo: ${method} - time: ${time}`);

  let id = req.params.id    
  productosDao.getById(id) 
  .then(data => {      
    res.status(201).json(data)
  })

});


products.post("/", auth, (req, res) => {  

  const { method } = req;
  const time = new Date().toLocaleString();
  logger.info(`Ruta '/productos' - con metodo: ${method} - time: ${time}`);

  const {name, description, code, thumbnail, price, stock} = req.body
  productosDao.save({name, description, code, thumbnail, price, stock})
  .then(data => {
    //res.status(201).json(data)
    //res.redirect('/productos')
    res.json(data)
  })

});


products.delete("/:id", auth, async (req, res) => { 
  const { method } = req;
  const time = new Date().toLocaleString();
  
  const datosUsuario = await usersDao.getById(req.user._id); //busco el usuario en la base de datos, y guardo los datos en una variable el req.user_id es el id del usuario que se guarda en la session
  const user = datosUsuario.username;  //guardo el nombre de usuario en una variable

  if (user.toLowerCase() !== 'eneas') { //si el usuario no es admin, redirecciono a la ruta /home
    logger.info(`Acceso no Autorizado --> Ruta '/productos' - con metodo: ${method} - time: ${time}`);
    return res.render('unauthorized')
  } 

  logger.info(`Ruta '/productos/:id' - con metodo: ${method} - time: ${time}`);
  
  let id = req.params.id  
  productosDao.deleteById(id) 
  .then(data => { 
    res.json(data) 
  })
  
});


products.get("/edtiProduct/:id", auth, async (req, res) => {

  const { method } = req;
  const time = new Date().toLocaleString();

  const datosUsuario = await usersDao.getById(req.user._id); //busco el usuario en la base de datos, y guardo los datos en una variable el req.user_id es el id del usuario que se guarda en la session
  const user = datosUsuario.username;  //guardo el nombre de usuario en una variable
  const id = req.params.id;

  //obtener item por id
  const producto = await productosDao.getById(id);

  if (user.toLowerCase() !== 'eneas') { //si el usuario no es admin, redirecciono a la ruta /home
    logger.info(`Acceso no Autorizado --> Ruta '/edtiProduct' - con metodo: ${method} - time: ${time}`);
    return res.render('unauthorized')
  } 

  logger.info(`Ruta '/edtiProduct' - con metodo: ${method} - time: ${time}`);
  return res.render('edtiProduct', {id: id, producto: producto})

});


products.put("/edtiProduct", auth, async (req, res) => {

  const { method } = req;
  const time = new Date().toLocaleString();

  const datosUsuario = await usersDao.getById(req.user._id); //busco el usuario en la base de datos, y guardo los datos en una variable el req.user_id es el id del usuario que se guarda en la session
  const user = datosUsuario.username;  //guardo el nombre de usuario en una variable

  if (user.toLowerCase() !== 'eneas') { //si el usuario no es admin, redirecciono a la ruta /home
    logger.info(`Acceso no Autorizado --> Ruta '/edtiProduct' - con metodo: ${method} - time: ${time}`);
    return res.render('unauthorized')
  } 
    
  const {_id, name, description, code, thumbnail, price, stock} = req.body
  
  productosDao.changeById(_id, {name, description, code, thumbnail, price, stock}) 
  .then(data => {
    logger.info(`Producto Editado con Exito --> Ruta '/edtiProduct' - con metodo: ${method} - time: ${time}`);
    res.json(data) 
  })
  
});


export {products};