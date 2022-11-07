import ContenedorMongoDB from "../../ContentMongoDb.js"; 
import { Cart } from "../../models/Cart.js";
import fetch from 'node-fetch';

class CarritosDaoMongoDb extends ContenedorMongoDB {
  constructor () {
    super(Cart)
  }

  async save(userId) {    
    let obj = {userId, products: []}
    const data = await super.save(obj)
    return data      
  }
 
  async addProduct(idCart, product) {     

    try {  

      const arr = await super.list()    

      let indexCart = arr.findIndex(el => el._id == idCart) //en mongo el id se guarda en _id      

      arr[indexCart].products.push(product)       
      const data = await super.changeById(idCart, arr[indexCart])
      return data                        
    } 
    catch (err) {      
      throw new Error('Error de escritura', err)
    }  
  } 


   //VERIFICAR FUNCION ****
  async deleteProduct(idCart, idProduct) {
    try {
      const arr = await super.list()
      if (arr.length === 0) {return ({"Error" : "No hay Carritos"})} 
  
      let indexCart = arr.findIndex(el => el._id == idCart) //en mongo el id se guarda en _id
      if (indexCart == -1) {
        return ({ error: 'Carrito no encontrado' })
      }        
      
      let indexProduct = arr[indexCart].products.findIndex(el => el._id == idProduct) //en mongo el id se guarda en _id
      if (indexProduct == -1) {
        return ({ error: 'Producto no encontrado' })
      }   
      
      arr[indexCart].products.splice(indexProduct, 1)   
      

      await super.changeById(idCart, arr[indexCart])
      return "Producto Eliminado"
    } 
    catch (err) {
      throw new Error('Error de escritura', err)
    }
  }
  

  async deleteAllProducts(idCart) {
    try {
      const arr = await super.list()
      if (arr.length === 0) {return ({"Error" : "No hay Carritos"})} 
  
      let indexCart = arr.findIndex(el => el._id == idCart) //en mongo el id se guarda en _id
      if (indexCart == -1) {
        return ({ error: 'Carrito no encontrado' })
      }        
      
      arr[indexCart].products = []   
      await super.changeById(idCart, arr[indexCart])
      return "Productos Eliminados"
    } 
    catch (err) {
      throw new Error('Error de escritura', err)
    }
  }
  
}

export {CarritosDaoMongoDb}


