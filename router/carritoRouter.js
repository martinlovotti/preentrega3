import {Router} from 'express';
import auth from '../middleware/auth.js';

//declaro el router
const carts = Router();

//importo el logger
import {logger} from '../logs/logger.js';

//importo el controller
import {carritosDao} from '../contenedores/daos/index.js';
import {productosDao} from '../contenedores/daos/index.js';
import {usersDao} from '../contenedores/daos/index.js';

//importo el middleware para enviar el mail y sms
import {newPurchase} from '../middleware/nodemailer.js';
import sendSMS from '../middleware/twilio.js';

//estructura carrito
//id, timestamp, products[]

//obtener todos los carritos. No se usa en el Front
carts.get("/list", async (req, res) => {

  const carts = await carritosDao.list()
  res.status(200).send(carts)
  
});

/* json con listado de productos  - Actualmente No se está usando */
/* carts.get("/products", async (req, res) => {
  const carts = await carritosDao.list()
  const cart = carts.find(el => el.userId == req.user._id)   
  const products = cart.products; 
  res.status(200).send(products)
}); */

//idem anterior pero con el id del carrito
carts.get("/:id/productos", auth, (req, res) => {  
  const {method} = req;
  const time = new Date().toLocaleString();

  let id = req.params.id    
  carritosDao.getById(id)  
  .then (data => { 
    logger.info(`Ruta '/carrito' - con metodo: ${method} - time: ${time}`);
    res.status(201).send(data.products)
  })
});



carts.get("/", auth, async (req, res) => { 

  const { method } = req;
  const time = new Date().toLocaleString();

  const carts = await carritosDao.list()
  const cart = carts.find(el => el.userId == req.user._id) //usuario guardado en las sesion  
  const datosUsuario = await usersDao.getById(req.user._id); 

  logger.info(`Ruta '/carrito' - con metodo: ${method} - time: ${time}`);
  res.render("cart", { //renderizo la vista home, y le paso el nombre de usuario
    userData : datosUsuario,        
    cart,    
  });  

});


carts.post("/", (req, res) => { 

  const {method} = req;
  const time = new Date().toLocaleString();

  let userId = req.body.userId  
  carritosDao.save(userId)
  .then(data => {
    logger.info(`Ruta '/carrito' - con metodo: ${method} - time: ${time}`);
    res.status(201).send(data)
  })   

});


carts.delete("/:id", (req, res) => { 

  const {method} = req;
  const time = new Date().toLocaleString();

  let id = req.params.id  
  carritosDao.deleteById(id) 
  .then(data => { 
    logger.info(`Ruta '/carrito' - con metodo: ${method} - time: ${time}`);
    res.json(data) 
  })

});


carts.get("/:id/productos", auth, (req, res) => {  

  const {method} = req;
  const time = new Date().toLocaleString();

  let id = req.params.id    
  carritosDao.getById(id)  
  .then (data => { 
    logger.info(`Ruta '/carrito' - con metodo: ${method} - time: ${time}`);
    res.status(201).send(data.products)
  })

});

//carts.post("/:idCarrito/:idProducto/",  (req, res) => { 
carts.post("/:idCarrito/:idProducto/", async (req, res) => { 

  const {method} = req;
  const time = new Date().toLocaleString();
  
  let idCarrito = req.params.idCarrito  
  let idProducto = req.params.idProducto

  const product = await productosDao.getById(idProducto)
 
  //carritosDao.addProduct(idCarrito, idProducto)
  carritosDao.addProduct(idCarrito, product)
  .then(data => {
    logger.info(`Ruta '/carrito' - con metodo: ${method} - time: ${time}`);
    res.status(201).json(data)
  }) 

});


carts.delete("/:idCarrito/:idProducto/", (req, res) => {

  const {method} = req;
  const time = new Date().toLocaleString();

  let idCarrito = req.params.idCarrito
  let idProducto = req.params.idProducto
  
  carritosDao.deleteProduct(idCarrito, idProducto)
  .then(data => {
    logger.info(`Ruta '/carrito' - con metodo: ${method} - time: ${time}`);
    res.status(201).json(data)
  })

});


//Finalizar Compra
carts.put("/buy", async (req, res) => {  

  const {method} = req;
  const time = new Date().toLocaleString();

  const datosUsuario = await usersDao.getById(req.user._id);
  const userName = datosUsuario.username;  //guardo el nombre de usuario en una variable
  const userMail = datosUsuario.email;  //guardo el mail de usuario en una variable
  const userPhone = datosUsuario.telefono;  //guardo el telefono de usuario en una variable

  const carts = await carritosDao.list()
  const cart = carts.find(el => el.userId == req.user._id)
  const products = cart.products;

  const id = req.body.cartId 

  const data = {
    userName,
    userMail,
    products
  }
  
  newPurchase(data); //envio el mail
  sendSMS(userPhone); //envio el sms

  carritosDao.deleteAllProducts(id)
    .then(data => {
      logger.info(`Compra Realizada con Exito --> Ruta '/carrito' - con metodo: ${method} - time: ${time}`);
      res.redirect("/");
    }) 
  
});


export  {carts};

