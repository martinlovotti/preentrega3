import mongoose from 'mongoose';
import config from '../config/config.js'; 

try {
  //conexion hacia la base de datos
  const URL = config.mongoUrl;
  mongoose.connect(URL);
  console.log('Base de datos conectada');
} catch (err) {
  console.log(error)
}      


class ContenedorMongoDB { 

  constructor(schema) {
    this.schema = schema;    
  }

  async list() {
    try {
      const arr = await this.schema.find({});  
      return arr;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(idEl) {    
    try {
      const el = await this.schema.findOne({ _id: idEl }) //en mongo el id se guarda en _id      
      return el;
    } catch (err) {
      return({error: 'elemento no encontrado'});
    }
  }

  async save(obj) {
    try { 
      let timestamp = new Date().getTime(); //VERIFICAR FUNCION **** 
      obj.timestamp = timestamp   //VERIFICAR FUNCION ****  
      const newObj = new this.schema(obj);
      const data = await newObj.save();  
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(idEl) {
    try {      
      const data = await this.schema.findByIdAndDelete(idEl)       
      return ('elemento Eliminado')
    } catch (error) {
      console.log(error);
    }
  }

  async changeById(idEl, obj) {    
    try {
      let timestamp = new Date().getTime(); //VERIFICAR FUNCION **** 
      obj.timestamp = timestamp   //VERIFICAR FUNCION **** 
      
      const el = await this.schema.findByIdAndUpdate(idEl, obj)      
      return ('elemento Actualizado') 
    } catch (error) {
      console.log(error);
    }
  }  
  
}



export default ContenedorMongoDB;
