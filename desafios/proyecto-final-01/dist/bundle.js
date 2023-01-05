/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/class/productsClass.js":
/*!************************************!*\
  !*** ./src/class/productsClass.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Product\": () => (/* binding */ Product)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n/*Un producto dispondrá de los siguientes campos:  id, timestamp, name, description, code, thumbnail, price, stock.*/\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar Product = /*#__PURE__*/function () {\n  function Product(id, timestamp, name, description, code, thumbnail, price, stock) {\n    _classCallCheck(this, Product);\n\n    this.id = id;\n    this.timestamp = timestamp;\n    this.name = name;\n    this.description = description;\n    this.code = code;\n    this.thumbnail = thumbnail;\n    this.price = price;\n    this.stock = stock;\n  }\n\n  _createClass(Product, [{\n    key: \"readProducts\",\n    value: function readProducts() {\n      var products = fs.readFileSync(\"./src/data/products.txt\", \"utf-8\");\n      return JSON.parse(products);\n    }\n  }, {\n    key: \"writeFileSync\",\n    value: function writeFileSync(products) {\n      fs.writeFileSync(\"./src/data/products.txt\", JSON.stringify(products, null, \"\\t\"));\n    }\n  }, {\n    key: \"updateProducts\",\n    value: function updateProducts(code, prdt) {\n      var products = this.readProducts();\n      var productFind = products.find(function (itemClass) {\n        return itemClass.code == code;\n      });\n\n      if (productFind !== undefined) {\n        var index = products.indexOf(productFind);\n        products[index] = prdt;\n        this.writeFileSync(products);\n        fs.writeFileSync(\"./src/data/products.txt\", JSON.stringify(products));\n        return products;\n      }\n    }\n  }, {\n    key: \"deleteProduct\",\n    value: function deleteProduct(code) {\n      var products = this.readProducts();\n      var productFind = products.find(function (itemClass) {\n        return itemClass.code == code;\n      });\n\n      if (productFind !== undefined) {\n        var index = products.indexOf(productFind);\n        products.splice(index, 1);\n        this.writeFileSync(products);\n        return products;\n      }\n    }\n  }, {\n    key: \"deleteAllProducts\",\n    value: function deleteAllProducts() {\n      fs.writeFileSync(\"./src/data/products.txt\", JSON.stringify([]));\n    }\n  }]);\n\n  return Product;\n}();\n\n//# sourceURL=webpack://proyecto-final-01/./src/class/productsClass.js?");

/***/ }),

/***/ "./src/class/userClass.js":
/*!********************************!*\
  !*** ./src/class/userClass.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"User\": () => (/* binding */ User)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n/*Un producto dispondrá de los siguientes campos:  id, timestamp, name, description, code, thumbnail, price, stock.*/\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar User = /*#__PURE__*/function () {\n  function User(email, password, cartProductsList) {\n    _classCallCheck(this, User);\n\n    this.email = email;\n    this.password = password;\n    this.cartProductsList = cartProductsList;\n  }\n\n  _createClass(User, [{\n    key: \"readData\",\n    value: function readData() {\n      var users = fs.readFileSync(\"./src/data/users.txt\", \"utf-8\");\n      return JSON.parse(users);\n    }\n  }, {\n    key: \"writeFileSync\",\n    value: function writeFileSync(user) {\n      fs.writeFileSync(\"./src/data/users.txt\", JSON.stringify(user));\n    }\n  }, {\n    key: \"signIn\",\n    value: function signIn(user) {\n      var userData = this.readData();\n\n      if (userData.email === user.email) {\n        return true;\n      } else {\n        this.writeFileSync(new User(user.email, user.password, []));\n        return true;\n      }\n    }\n  }, {\n    key: \"addProduct\",\n    value: function addProduct(product) {\n      var userData = this.readData();\n      userData.cartProductsList.push(product);\n      this.writeFileSync(userData);\n      return true;\n    }\n  }, {\n    key: \"deleteProductFromCart\",\n    value: function deleteProductFromCart(code) {\n      var userData = this.readData();\n      var productFind = userData.cartProductsList.find(function (product) {\n        return product.code == code;\n      });\n\n      if (productFind !== undefined) {\n        var index = userData.cartProductsList.indexOf(productFind);\n        userData.cartProductsList.splice(index, 1);\n        this.writeFileSync(userData);\n        return true;\n      } else {\n        return false;\n      }\n    }\n  }, {\n    key: \"deleteAllProductsFromCart\",\n    value: function deleteAllProductsFromCart() {\n      var userData = this.readData();\n      userData.cartProductsList = [];\n      this.writeFileSync(userData);\n      return true;\n    }\n  }]);\n\n  return User;\n}();\n\n//# sourceURL=webpack://proyecto-final-01/./src/class/userClass.js?");

/***/ }),

/***/ "./src/routes/carrito.js":
/*!*******************************!*\
  !*** ./src/routes/carrito.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:\r\nPOST: '/' - Crea un carrito y devuelve su id.\r\nDELETE: '/:id' - Vacía un carrito y lo elimina.\r\nGET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito\r\nPOST: '/:id/productos' - Para incorporar productos al carrito por su id de producto\r\nDELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto\r\n\r\nCrear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas. En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }\r\n*/\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar _require = __webpack_require__(/*! ../class/userClass */ \"./src/class/userClass.js\"),\n    User = _require.User;\n\nvar _require2 = __webpack_require__(/*! ../class/productsClass */ \"./src/class/productsClass.js\"),\n    Product = _require2.Product;\n\nvar _require3 = __webpack_require__(/*! ../server */ \"./src/server.js\"),\n    autorizar = _require3.autorizar;\n\nvar ProductClass = new Product();\nvar userClass = new User();\nvar listProducts = ProductClass.readProducts();\nrouter.get(\"/\", autorizar, function (req, res) {\n  var cartList = userClass.readData();\n\n  if (cartList) {\n    res.send(cartList.cartProductsList).status(200);\n  } else {\n    res.send(\"No hay ningun producto guardado en el usuario\").status(200);\n  }\n});\nrouter.post(\"/\", autorizar, function (req, res) {\n  var code = req.body.code;\n  var findPoduct = listProducts.find(function (product) {\n    return product.code == code;\n  });\n\n  if (findPoduct) {\n    var newCart = userClass.addProduct(findPoduct);\n\n    if (newCart) {\n      res.send(\"Producto agregado al carrito\").status(200);\n    } else {\n      res.send(\"Producto no encontrado\").status(404);\n    }\n  } else {\n    res.send(\"El codigo de producto no existe\").status(404);\n  }\n});\nrouter[\"delete\"](\"/:code?\", autorizar, function (req, res) {\n  var code = req.params.code;\n\n  if (code) {\n    console.log(\"🦇 ~ file: carrito.js ~ line 49 ~ router.delete ~ code\", code);\n    var deleteCart = userClass.deleteProductFromCart(code);\n\n    if (deleteCart) {\n      res.send(\"Carrito eliminado\").status(200);\n    } else {\n      res.send(\"Carrito no encontrado\").status(404);\n    }\n  } else {\n    var deleteAllCart = userClass.deleteAllProductsFromCart();\n\n    if (deleteAllCart) {\n      res.send(\"Carrito eliminado\").status(200);\n    } else {\n      res.send(\"Carrito no encontrado\").status(404);\n    }\n  }\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://proyecto-final-01/./src/routes/carrito.js?");

/***/ }),

/***/ "./src/routes/productos.js":
/*!*********************************!*\
  !*** ./src/routes/productos.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*\r\nEl router base '/api/productos' implementará cuatro funcionalidades:\r\nGET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)\r\nPOST: '/' - Para incorporar productos al listado (disponible para administradores)\r\nPUT: '/:id' - Actualiza un producto por su id (disponible para administradores)\r\nDELETE: '/:id' - Borra un producto por su id (disponible para administradores)\r\n*/\n\n/*Un producto dispondrá de los siguientes campos:  id, timestamp, name, description, code, thumbnail, price, stock.*/\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar _require = __webpack_require__(/*! ../class/productsClass */ \"./src/class/productsClass.js\"),\n    Product = _require.Product;\n\nvar _require2 = __webpack_require__(/*! uuid */ \"uuid\"),\n    uuidv4 = _require2.v4;\n\nvar moment = __webpack_require__(/*! moment */ \"moment\");\n\nvar _require3 = __webpack_require__(/*! ../server */ \"./src/server.js\"),\n    autorizar = _require3.autorizar;\n\nvar ProductClass = new Product();\nvar listProducts = ProductClass.readProducts(); //ruta sin autenticacion\n\nrouter.get(\":id?\", function (req, res) {\n  var id = req.params.id;\n\n  if (id) {\n    var product = ProductClass.readProducts().find(function (product) {\n      return product.id == id;\n    });\n\n    if (product) {\n      res.send(product);\n    } else {\n      res.send(\"Producto no encontrado\");\n    }\n  } else {\n    res.send(ProductClass.readProducts()).status(200);\n  }\n});\nrouter.post(\"/\", autorizar, function (req, res) {\n  var _req$body = req.body,\n      name = _req$body.name,\n      description = _req$body.description,\n      thumbnail = _req$body.thumbnail,\n      price = _req$body.price;\n  var id = ProductClass.readProducts().length + 1;\n  var timestamp = moment().format(\"DD/MM/YYYY HH:mm:ss\");\n  var uuid = uuidv4();\n\n  if (name && description && thumbnail && price) {\n    var newProduct = {\n      id: id,\n      timestamp: timestamp,\n      name: name,\n      description: description,\n      thumbnail: thumbnail,\n      price: price,\n      code: uuid,\n      stock: 0\n    };\n    listProducts.push(newProduct);\n    ProductClass.writeFileSync(listProducts);\n    res.status(200).send(\"Producto creado\");\n  } else {\n    res.status(400).send(\"Error en los datos\");\n  }\n});\nrouter.put(\"/:code\", autorizar, function (req, res) {\n  var code = req.params.code;\n  var id = ProductClass.readProducts().length + 1;\n  var _req$body2 = req.body,\n      name = _req$body2.name,\n      description = _req$body2.description,\n      thumbnail = _req$body2.thumbnail,\n      price = _req$body2.price;\n  var timestamp = moment().format(\"DD/MM/YYYY HH:mm:ss\");\n  var uuid = uuidv4();\n  var product = {\n    id: id,\n    timestamp: timestamp,\n    name: name,\n    description: description,\n    thumbnail: thumbnail,\n    price: price,\n    code: uuid,\n    stock: 0\n  };\n  ProductClass.updateProducts(code, product);\n  res.status(200).send(\"Producto actualizado\");\n});\nrouter[\"delete\"](\"/:code?\", autorizar, function (req, res) {\n  var code = req.params.code;\n  var product = listProducts.find(function (product) {\n    return product.code == code;\n  });\n\n  if (code) {\n    if (product) {\n      ProductClass.deleteProduct(code);\n      res.send(\"Producto eliminado\").status(200);\n    } else {\n      res.send(\"Producto no encontrado\").status(404);\n    }\n  } else {\n    ProductClass.deleteAllProducts();\n    res.send(\"Productos eliminados\").status(200);\n  }\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://proyecto-final-01/./src/routes/productos.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"autorizar\": () => (/* binding */ autorizar)\n/* harmony export */ });\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar morgan = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar _require = __webpack_require__(/*! ./class/userClass */ \"./src/class/userClass.js\"),\n    User = _require.User;\n\nvar _require2 = __webpack_require__(/*! http */ \"http\"),\n    HtppServer = _require2.Server;\n\nvar _require3 = __webpack_require__(/*! socket.io */ \"socket.io\"),\n    IOServer = _require3.Server;\n\nvar app = express();\nvar httpServer = new HtppServer(app);\nvar io = new IOServer(httpServer);\nvar userClass = new User();\napp.set(\"PORT\", process.env.PORT || 8080);\napp.use(express[\"static\"](\"public\"));\napp.set(\"view engine\", \"handlebars\");\napp.set(\"views\", \"./views\");\napp.use(express.json());\napp.use(express.urlencoded({\n  extended: true\n}));\napp.use(morgan(\"dev\"));\nvar userState = false;\nfunction autorizar(req, res, next) {\n  if (userState || req.headers.authorization) {\n    console.log(\"AUTHORIZED ACCESS\");\n    next();\n  } else {\n    console.log(\"UNAUTHORIZED ACCESS\");\n    io.sockets.emit(\"unauthorized-access\");\n    res.status(403).send(\"Ruta no autorizada\");\n  }\n}\napp.use(\"/api/productos\", __webpack_require__(/*! ./routes/productos.js */ \"./src/routes/productos.js\"));\napp.use(\"/api/carrito\", __webpack_require__(/*! ./routes/carrito.js */ \"./src/routes/carrito.js\"));\nio.on(\"connection\", function (socket) {\n  socket.emit(\"refresh-new-products\");\n  socket.on(\"sign-up\", function (user) {\n    userClass.signUp(user);\n  });\n  socket.on(\"sign-in\", function (user) {\n    var signIn = userClass.signIn(user);\n\n    if (signIn) {\n      io.sockets.emit(\"refresh-new-products-cart\");\n      userState = true;\n    }\n  });\n  socket.on(\"change-list\", function () {\n    io.sockets.emit(\"refresh-new-products\");\n  });\n  socket.on(\"change-list-cart\", function () {\n    io.sockets.emit(\"refresh-new-products-cart\");\n  });\n}); //Escuchamos el puerto\n\nvar connectedServer = httpServer.listen(app.get(\"PORT\"), function () {\n  console.log(\"Server htpp listen in  \".concat(app.get(\"PORT\"), \" \"));\n}); //por si hay algun error en el servidor\n\nconnectedServer.on(\"error\", function (error) {\n  console.log(\"Error en servidor \".concat(error));\n});\n\n//# sourceURL=webpack://proyecto-final-01/./src/server.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("moment");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("morgan");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("socket.io");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("uuid");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.js");
/******/ 	
/******/ })()
;