class Usuario {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
  }
  getFullName = () => {
    return `${this.nombre} - ${this.apellido}`;
  };
  addMascota = (mascota) => {
    this.mascotas.push(mascota);
  };
  countMascotas = () => {
    return this.mascotas.length;
  };
  addBook = (libro, autor) => {
    this.libros.push({
      nombre: libro,
      autor: autor,
    });
  };
  getBookNames = () => {
    const onlyName = this.libros.map((libro) => libro.nombre);
    return onlyName;
  };
}
const usuario1 = new Usuario("Juan", "Perez");
const usuario2 = new Usuario("Pedro", "Sanchez");

usuario1.addMascota("Perro");
usuario1.addMascota("Gato");
usuario1.addMascota("Caballo");
usuario1.addBook("El señor de los anillos", "J.R.R. Tolkien");
usuario1.addBook("El señor de los anillos 2", "J.R.R. Tolkien");

printAll = () => {
  console.log(usuario1.getFullName());
  console.log(usuario1.countMascotas());
  console.log(usuario1.getBookNames());
};
printAll();
