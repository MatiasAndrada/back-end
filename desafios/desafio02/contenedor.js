//Esto hace q cada vez q utilizo el fs se agregue el promises
const { promises: fs } = require("fs");

class contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  } 

  async save(newObject) {
    const objects = await this.getAll();
    let newId;
    if (objects.length == 0) {
      newId = 1;
    } else {
      const lastId = parseInt(objects[objects.length - 1].id);
      newId = lastId + 1;
    }
    objects.push({ ...newObject, id: newId });
    try {
      await fs.writeFile(this.ruta, JSON.stringify(objects, null, 2));
      return newId
    } catch (err) {
      throw new Error(`Error al guardar el archivo ${this.ruta} ${err}`);
    }
  }

  async getById(id) {
    const objects = await this.getAll();
    const obj = objects.find((obj) => obj.id == id);
    if (!obj) {
      throw new Error(`No existe el objeto con id ${id}`);
    }
    console.log(obj);
    return obj;
  }

  async getAll() {
    try {
      const objects = await fs.readFile(this.ruta, 'utf8');
      return JSON.parse(objects);
    } catch (err) {
      //se devuelve un array vacio para q no de error el save()
      return [];
    }
  }

  async deleteById(id) {
    const objects = await this.getAll();
    const newObjects = objects.filter((obj) => obj.id !== id);
    if (objects.length === newObjects.length) {
      throw new Error(`No existe el objeto con id ${id}`);
    }
    try {
      await fs.writeFile(this.ruta, JSON.stringify(newObjects, null, 2));
    } catch (err) {
      throw new Error(`Error al eliminar el archivo ${this.ruta} ${err}`);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.ruta, "");
    } catch (err) {
      throw new Error(`Error al eliminar el archivo ${this.ruta} ${err}`);
    }
  }
}

const listProducts = new contenedor("./products.txt");
module.exports.listProducts  = listProducts;

//guarada un nuevo producto

/*  listProducts.save({
  title: "Perfume de ambiente",
  price: "8USD",
  thumbnail:
    "https://www.papelerapitti.com.ar/2680-large_default/desodorante-poet-350c-lavanda.jpg",
}); 
 */
/* listProducts.save({
  title: "Detejertente Ala",
  price: "3USD",
  thumbnail:
    "https://www.dinoonline.com.ar/super/producto/detergente-ala-plus-aloe-vera-x-750-ml/_/A-2790503-2790503-s",
}); 
 */

//obtiene un producto por id
/* listProducts.getById(1) */

//elimina un producto por id
/* listProducts.deleteById(1); */

//elimina todos los productos
/* listProducts.deleteAll();  */
