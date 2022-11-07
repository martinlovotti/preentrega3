import {Router} from 'express';
import auth from '../middleware/auth.js';
import {usersDao} from '../contenedores/daos/index.js';

//declaro el router
const userInfo = Router();

userInfo.get("/", auth, async (req, res) => {  

  const userData = await usersDao.getById(req.user._id); //busco el usuario en la base de datos, y guardo los datos en una variable el req.user_id es el id del usuario que se guarda en la session  /
  res.render('user', {userData}); //si no hay error, renderizo la vista logout y le paso el parametro user  
  
});

export {userInfo};

