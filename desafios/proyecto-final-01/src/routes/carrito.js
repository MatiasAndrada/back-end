/*El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:
POST: '/' - Crea un carrito y devuelve su id.
DELETE: '/:id' - Vacía un carrito y lo elimina.
GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }
*/
const express = require("express");
const router = express.Router();
const { User } = require("../class/userClass");
const { Product } = require("../class/productsClass");
const { autorizar } = require("../server");

const ProductClass = new Product();
const userClass = new User();

const listProducts = ProductClass.readProducts();

router.get("/", autorizar, (req, res) => {
  const cartList = userClass.readData();
  if (cartList) {
    res.send(cartList.cartProductsList).status(200);
  } else {
    res.send("No hay ningun producto guardado en el usuario").status(200);
  }
});

router.post("/", autorizar, (req, res) => {
  const { code } = req.body;
  const findPoduct = listProducts.find((product) => {
    return product.code == code;
  });
  if (findPoduct) {
    const newCart = userClass.addProduct(findPoduct);
    if (newCart) {
      res.send("Producto agregado al carrito").status(200);
    } else {
      res.send("Producto no encontrado").status(404);
    }
  } else {
    res.send("El codigo de producto no existe").status(404);
  }
});
router.delete("/:code?", autorizar, (req, res) => {
  const { code } = req.params;
  if (code) {
    console.log("🦇 ~ file: carrito.js ~ line 49 ~ router.delete ~ code", code)
    const deleteCart = userClass.deleteProductFromCart(code);
    if (deleteCart) {
      res.send("Carrito eliminado").status(200);
    } else {
      res.send("Carrito no encontrado").status(404);
    }
  } else {
    const deleteAllCart = userClass.deleteAllProductsFromCart();
    if (deleteAllCart) {
      res.send("Carrito eliminado").status(200);
    } else {
      res.send("Carrito no encontrado").status(404);
    }
  }
});
module.exports = router;
