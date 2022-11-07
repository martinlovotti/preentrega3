import admin from 'firebase-admin';
import config from '../config/config.js';



admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
  databaseURL: config.firebaseUrl,
});

console.log("Base de datos conectada");


const db = admin.firestore();

class ContenedorFirebase {

  constructor(nombreCollection) {
    this.query = db.collection(nombreCollection);
  }

  async list() {
    try {
      const arr = []
      const snapshot = await this.query.get();
      snapshot.forEach(doc => {
        arr.push({id: doc.id, ...doc.data()})
      })
      console.log(arr);
      return arr;
    } catch (error) {
      console.log(error);
    }

  }


  async getById(idEl) {

    try {
      let id = idEl
      const doc = await this.query.doc(id).get();
      if (!doc.exists) {
        throw new Error("No existe el documento");
      } else {
        const data = doc.data();
        console.log(data);
        return {...data, id}
      }
    } catch (error) {
      return({error: error.message});
    }
  
  }


  async save(obj) { 
    
    try {
      let timestamp = new Date().getTime(); //VERIFICAR FUNCION ****    
      obj.timestamp = timestamp //VERIFICAR FUNCION **** 
      const saved = await this.query.add(obj);
      console.log('Elemento Guardado id:', saved.id );
      return {...obj, id: saved.id};
    } catch (error) {
      console.log(error);
    } 

  }


  async deleteById(idEl) {

    try {
      const deleted = await this.query.doc(idEl).delete();
      console.log('Elemento Eliminado');
      return deleted;
    } catch (error) {
      console.log(error);
    }  
   
  }
  

  async changeById(idEl, obj) {

    try {
      const updated = await this.query.doc(idEl).set(obj);
      console.log('Elemento Actualizado');
      return updated;
    } catch (error) {
      console.log(error);
    }
    
  }

}

export default ContenedorFirebase;
