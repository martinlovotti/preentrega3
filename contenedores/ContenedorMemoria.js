class ContenedorMemoria {
  
  constructor(arr) {
    this.arr = arr
  }    

  async list() { 
    const arr = this.arr       
    console.log(this.arr);  
    return arr;  
  }

  async getById(i) {  
    if (this.arr === 0) {return "DB Vacia"} 
    let index = this.arr.findIndex(x => x.id == i)

    if (index == -1) {
      return ({ error: 'Producto no encontrado' })
    } else {
      return this.arr[index]         
    }  
  }  

  async save(obj) {
    let timestamp = new Date().getTime(); 
    let id;

    if (this.arr.length === 0) {
      id = 1
    } else {
      id = this.arr.length + 1
    }   

    obj.id = id
    obj.timestamp = timestamp 
     
    this.arr.push(obj)  
    console.log(obj);    
    return(obj)    
  }

  async deleteById(i) {
    let index = this.arr.findIndex(x => x.id == i)
    if (index == -1) {
      return "No existe el id"
    } else {
      this.arr.splice(index, 1)
      console.log('Elemento Eliminado');
      return "Elemento Eliminado"
    }       
  }

  async changeById(i, object) {
    let index = this.arr.findIndex(x => x.id == i)

    if (index == -1) {
      return ({ error: 'Producto no encontrado' })
    } 

    object.id = i
    object.timestamp = this.arr[index].timestamp    
    const editedProduct = {...this.arr[index], ...object}    
    this.arr[index] = editedProduct  
    console.log("Producto Reemplazado");  
    return "Producto Reemplazado"
  }

}

export default ContenedorMemoria;