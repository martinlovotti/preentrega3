import ContenedorMongoDB from "../../ContentMongoDb.js";
import { User } from "../../models/User.js"; 
import bcrypt from "bcrypt";

class UserDaoMongoDb extends ContenedorMongoDB {
  constructor () {
    super(User) 
  }

  async save(obj) {

    try {
      const userExist = await User.findOne({email: obj.email}); //busco si el usuario ya existe en la base de datos
      if (userExist) { //si el usuario existe
        return false; //devuelvo false
      } else { //si el usuario no existe
        const hashPass = await bcrypt.hash(obj.password, 8) //encripto la contraseña
        obj.password = hashPass; //guardo la contraseña encriptada en el usuario
        const data = await super.save(obj); //guardo el usuario en la base de datos
        console.log(data);
        return data; //devuelvo el usuario
      }      
    } catch (error) {
      console.log(error);
    }

  }


}

export {UserDaoMongoDb}