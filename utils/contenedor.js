import * as fs from 'fs'

//funcion para leer el archivo
const list = async (ruta) => {

  try {      
    const data = fs.readFileSync(ruta, 'utf-8')
    const dataObj = JSON.parse(data) 
    return (dataObj)
  }
  catch (err) {      
    throw new Error('No se pudo leer archivo', err)
  }

}


//funcion para detectar el ID mas grande
const lastID = (arr) => { 

  let id = 0;
  if (arr.length > 0) {
    for (const el of arr ) {
      if (el.id > id) {
        id = el.id
      }
    }
  }
  return id

} 

//funcion que agrega producto
const save = async (product, ruta) => {
      
  try {  
    let timestamp = new Date().getTime();            
    const arr = await list(ruta)      
    const previusID = lastID(arr)      
    product.id = previusID + 1
    product.timestamp = timestamp 

    //agregar objeto al array  
    arr.push(product) 

    //reescribo el archivo con el nuevo objeto    
    fs.writeFileSync(ruta, JSON.stringify(arr, null, 2)) 
    return(product)
  }
  catch (err) {      
    throw new Error('Error de escritura', err)
  } 

} 


 //funcion para obtener producto segun ID
const getById = async (x, ruta) => {   
    
  try {             
    const arr = await list(ruta)    
    if (arr.length === 0) {return "Archivo Vacio"} 
    return (arr.find(el => el.id == x) || { error: 'Producto no encontrado' })
  }
  catch (err) {      
    throw new Error('Error de Lectura', err)
  }

}  

//funcion que elimina segun id
const deleteById = async (i, ruta) => {  

  try {
    const arr = await list(ruta)    
    let index = arr.findIndex(x => x.id == i) 
    if (index == -1) {
      return ({ error: 'Producto no encontradooooo' })
    }  

    const newArr = arr.filter(el => el.id != i)    
    fs.writeFileSync(ruta, JSON.stringify(newArr, null, 2))    
    return "Producto Eliminado" 
  } 
  catch (err) {    
    throw new Error('Error de escritura', err)
  }  

} 


 //funcion que cambia producto segun id
 const changeById = async (i, object, ruta) => {

  try {
    const arr = await list(ruta) 
    let index = arr.findIndex(x => x.id == i)

    if (index == -1) {
      return ({ error: 'Producto no encontradooo' })
    } 

    object.id = i
    object.timestamp = arr[index].timestamp    
    const editedProduct = {...arr[index], ...object}    
    arr[index] = editedProduct

    fs.writeFileSync(ruta, JSON.stringify(arr, null, 2)) 

    return "Producto Reemplazado"
  }

  catch (err) {    
    throw new Error('Error de escritura', err)
  } 
  
} 

export {list, save, getById, deleteById, changeById}