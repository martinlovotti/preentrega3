import ContenedorMemoria from "../../ContenedorMemoria.js";
import {carritos} from '../../../db/memoria.js';
import fetch from 'node-fetch';

class CarritosDaoMemoria extends ContenedorMemoria { 
  constructor () {
    super(carritos)
  }

  async save() {
    let obj = {products: []}  
    super.save(obj)     
  }

  /* async addProduct(idCart, product) {
    try {
      const arr = await super.list()
      if (arr.length === 0) {return ({"Error" : "No hay Carritos"})} 
  
      let indexCart = arr.findIndex(el => el.id == idCart)
      if (indexCart == -1) {
        return ({ error: 'Carrito no encontrado' })
      }   
      
      arr[indexCart].products.push(product)
      await super.changeById(idCart, arr[indexCart])
      return "Producto Agregado"      
    } 
    catch (err) {      
      throw new Error('Error de escritura', err)
    }  
  } */

  //Modificar ya que actualmente el producto llega como un objeto y no el id
  async addProduct(idCart, idProduct) {
    try {
      const productData = await fetch (`/api/productos/${idProduct}`) 
      const product = await productData.json()

      if (product.error) { //es el error que devuelve mongo al no encontrar el id
        return ({ error: 'Producto no encontrado' })
      }
      
      const arr = await super.list()
      if (arr.length === 0) {return ({"Error" : "No hay Carritos"})}

      let indexCart = arr.findIndex(el => el.id == idCart)
      if (indexCart == -1) {
        return ({ error: 'Carrito no encontrado' })
      }

      arr[indexCart].products.push(product)
      await super.changeById(idCart, arr[indexCart])
      return "Producto Agregado"     

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
  
      let indexCart = arr.findIndex(el => el.id == idCart)
      if (indexCart == -1) {
        return ({ error: 'Carrito no encontrado' })
      }   
      
      let indexProduct = arr[indexCart].products.findIndex(el => el.id == idProduct)
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

}

export {CarritosDaoMemoria};