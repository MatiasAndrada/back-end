const admin = require("firebase-admin");
const config = require("./config.js");

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});
const db = admin.firestore();
//const this.coleccion = db.collection('productos')

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }

  async getAll() {
    try {
      const result = [];
      const snapshot = await this.coleccion.get();
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      return result;
    } catch (err) {
      return [];
    }
  }

  async getById(x) {
    try {
      const item = await this.coleccion.doc(`${x}`).get();
      if (!item.exists) {
        throw new Error(`Error leer el ID del item`);
      } else {
        const respuesta = item.data();
        return { id: x, ...respuesta };
      }
    } catch (err) {
      throw new Error(`Error leer el ID de archivo: ${err}`);
    }
  }

  async saveAll(arrayItems) {
    try {
      let preSave = await this.getAll();

      if (preSave.length === 0) {
        await this.createAll(arrayItems);
      } else {
        for (let i = 0; i < preSave.length; i++) {
          await this.coleccion.doc(`${preSave[i].id}`).delete();
        }
        await this.createAll(arrayItems);
      }
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async save(newObj) {
    const informacion = await this.getAll();
    let newId;
    if (informacion.length == 0) {
      newId = 1;
    } else {
      newId = parseInt(informacion[informacion.length - 1].id) + 1;
    }
    try {
      await this.coleccion.doc(`${newId}`).set(newObj);
      return newId;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async deleteById(x) {
    try {
      const res = await this.coleccion.doc(`${x}`).delete();
    } catch (error) {
      throw new Error(`Error al eliminar el objeto del archivo: ${error}`);
    }
  }

  async deleteAll() {
    try {
      let preDelete = await this.getAll();
      for (let i = 0; i < preDelete.length; i++) {
        await this.coleccion.doc(`${preDelete[i].id}`).delete();
      }
    } catch (error) {
      throw new Error(`Error al eliminar el objeto del archivo: ${error}`);
    }
  }

  async putById(x, newObj) {
    try {
      await this.coleccion.doc(`${x}`).update(newObj);
    } catch (error) {
      throw new Error(`Error leer el ID de archivo: ${error}`);
    }
  }

  async createAll(arrayCreate) {

    if("id" in arrayCreate[1]){
      for(let i = 0; i <arrayCreate.length; i++ ){
        let doc = this.coleccion.doc(`${arrayCreate[i].id}`)
        await doc.create({
          "id": arrayCreate[i].id,
          "nombre": arrayCreate[i].nombre,
          "apellido": arrayCreate[i].apellido,
          "edad": arrayCreate[i].edad,
          "alias": arrayCreate[i].alias,
          "avatar": arrayCreate[i].avatar,
        })
      }
    }
    if("_id" in arrayCreate[1]){
      for(let i = 0; i <arrayCreate.length; i++ ){
        let doc = this.coleccion.doc(`${arrayCreate[i]._id}`)
        await doc.create({
          "_id": arrayCreate[i]._id,
          "author": arrayCreate[i].author,
          "text": arrayCreate[i].text,
          "fecha": arrayCreate[i].fecha,
        })
      }
    }
  }
}
module.exports = ContenedorFirebase;
