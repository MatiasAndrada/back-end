/*Un producto dispondrá de los siguientes campos:  id, timestamp, name, description, code, thumbnail, price, stock.*/
const fs = require("fs");

export class User {
  constructor(email, password, cartProductsList) {
    this.email = email;
    this.password = password;
    this.cartProductsList = cartProductsList;
  }

  readData() {
    const users = fs.readFileSync("./src/data/users.txt", "utf-8");
    return JSON.parse(users);
  }
  writeFileSync(user) {
    fs.writeFileSync("./src/data/users.txt", JSON.stringify(user));
  }
  signIn(user) {
    const userData = this.readData();
    if (userData.email === user.email) {
      return true;
    } else {
      this.writeFileSync(new User(user.email, user.password, []));
      return true;
    }
  }

  addProduct(product) {
    const userData = this.readData();
    userData.cartProductsList.push(product);
    this.writeFileSync(userData);
    return true;
  }

  deleteProductFromCart(code) {
    const userData = this.readData();
    const productFind = userData.cartProductsList.find((product) => product.code == code);
    if (productFind !== undefined) {
      const index = userData.cartProductsList.indexOf(productFind);
      userData.cartProductsList.splice(index, 1);
      this.writeFileSync(userData);
      return true;
    } else {
      return false;
    }
  }

  deleteAllProductsFromCart() {
    const userData = this.readData();
    userData.cartProductsList = [];
    this.writeFileSync(userData);
    return true;
  }
}
