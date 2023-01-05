/*Un producto dispondrá de los siguientes campos:  id, timestamp, name, description, code, thumbnail, price, stock.*/
const fs = require("fs");

export class Product {
  constructor(id, timestamp, name, description, code, thumbnail, price, stock) {
    this.id = id;
    this.timestamp = timestamp;
    this.name = name;
    this.description = description;
    this.code = code;
    this.thumbnail = thumbnail;
    this.price = price;
    this.stock = stock;
  }
  readProducts() {
    const products = fs.readFileSync("./src/data/products.txt", "utf-8");
    return JSON.parse(products);
  }
  writeFileSync(products) {
    fs.writeFileSync(
      "./src/data/products.txt",
      JSON.stringify(products, null, "\t")
    );
  }
  updateProducts(code, prdt) {
    const products = this.readProducts();
    const productFind = products.find((itemClass) => itemClass.code == code);
    if (productFind !== undefined) {
      const index = products.indexOf(productFind);
      products[index] = prdt;
      this.writeFileSync(products);
      fs.writeFileSync("./src/data/products.txt", JSON.stringify(products));
      return products;
    }
  }
  deleteProduct(code) {
    const products = this.readProducts();
    const productFind = products.find((itemClass) => itemClass.code == code);
    if (productFind !== undefined) {
      const index = products.indexOf(productFind);
      products.splice(index, 1);
      this.writeFileSync(products);
      return products;
    }
  }
  deleteAllProducts() {
    fs.writeFileSync("./src/data/products.txt", JSON.stringify([]));
  }
}
