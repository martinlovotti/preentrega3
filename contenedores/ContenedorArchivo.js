import {list, save, getById, deleteById, changeById} from '../utils/contenedor.js';

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }
  
  async list() {
    const data = await list(this.ruta) 
    console.log(data);    
    return data;  
  }

  async getById(x) {
    const data =  await getById(x, this.ruta) 
    console.log(data)   
    return data
  }

  async save(obj) {
    const data = await save(obj, this.ruta)
    console.log(data) 
    return data
  }

  async deleteById(x) {
    const data = await deleteById(x, this.ruta)
    console.log(data) 
    return data
  }

  async changeById(i, object) {
    const data = await changeById(i, object, this.ruta)
    console.log(data) 
    return data
  }
 
}

export default ContenedorArchivo;
