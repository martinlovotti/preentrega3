import ContenedorMongoDB from "../../ContentMongoDb.js"; 
import { Product } from "../../models/Product.js"; 

class ProductosDaoMongoDb extends ContenedorMongoDB {
  constructor () {
    super(Product) 
  }
}

export {ProductosDaoMongoDb}