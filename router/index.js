import express from 'express';

let router = express.Router();

//Importo los routers
import {home} from './homeRouter.js';
import {productsList} from './productsListRouter.js'
import {products} from './productRouter.js'
import {carts} from './carritoRouter.js'
import {users} from './userRouter.js'
import {login} from './loginRouter.js'
import {loginError} from './loginerrorRouter.js'
import {logout} from './logoutRouter.js'
import {sessions} from './sessionsRouter.js'
import {userInfo} from './userInfoRouter.js'
import {error} from './errorRouter.js'

//middlewares
router.use("/lista-productos", productsList);
router.use("/productos", products);
router.use("/carrito", carts);
router.use("/register", users);
router.use("/login", login); 
router.use("/loginerror", loginError); 
router.use("/logout", logout); 
router.use("/sessions", sessions); 
router.use("/user", userInfo); 
router.use("/", home);
router.use("*", error);

//module.exports = router;
export {router};


