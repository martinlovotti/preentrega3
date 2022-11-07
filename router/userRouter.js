import {Router} from 'express';

//declaro el router
const users = Router();

//importo el logger
import {logger} from '../logs/logger.js';

//importo la funcion para enviar mail
import {sendMail} from '../middleware/nodemailer.js';

//importo la funcion para subir archivos
import upload from '../middleware/multer.js';

//importo el controller
import {usersDao} from '../contenedores/daos/index.js';


users.get("/", (req, res) => {  

  const { method } = req;
  const time = new Date().toLocaleString();
  logger.info(`Ruta '/register' - con metodo: ${method} - time: ${time}`);

  res.render('register'); 

});


users.post("/", upload.single("myFile"), (req, res) => {

  const {method} = req;
  const time = new Date().toLocaleString();

  const file = req.file;
  const image = file.filename;
  console.log(file);
  
  const {username, edad, telefono, direccion, password, email } = req.body //desestructuro el body del request, para obtener los datos del formulario. username, email y password son los name de los input del formulario  
  usersDao.save({username, email, edad, telefono, direccion, password, image }) //ejecuto la funcion save del controller, y le paso los datos del formulario

  .then (user => {
    if (user) { //la funcion save del controller devuelve un objeto con los datos del usuario, si el usuario existe
      
      //enviar email
      sendMail(user);  

      logger.info(`Registro Exitoso --> Ruta '/register' - con metodo: ${method} - time: ${time}`);      
      return res.render('succes') //si el usuario existe, redirecciono a la ruta /login          
    } else {
      logger.warn(`Registro Fallido --> Ruta '/register' - con metodo: ${method} - time: ${time}`);
      res.render('error', {error: 'Usuario ya registrado', url: 'register' }) //si el usuario no existe, renderizo la vista error, y le paso un objeto con el mensaje de error      
    }      
  })

});


//FUNCIONES NO UTILIZADAS EN EL FRONT
users.delete("/:id", (req, res) => {   

  let id = req.params.id  
  usersDao.deleteById(id) 
  .then(data => { 
    res.json(data) 
  })

});


users.put("/:id", (req, res) => {
  
    let id = req.params.id
    const {username, email, password} = req.body
    usersDao.changeById(id, {username, email, password}) 
    .then(data => {
      res.json(data) 
    })
  
});


export  {users};

