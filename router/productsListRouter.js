import {Router} from 'express';

//declaro el router
const productsList = Router();

//importo los controllers
import {productosDao} from '../contenedores/daos/index.js';

productsList.get("/", async (req, res) => {
  const productos = await productosDao.list();
  /* devolver el json de productos */ 
  res.json(productos);
});

export {productsList};