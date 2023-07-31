const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product){
    try {
      const products = await this.getProducts();
      const newProduct = {
        ...product,
        id: products.length + 1,
      };
      products.push(newProduct);
      this.saveProducts(products);
  
      console.log("Producto agregado correctamente!");
      return newProduct.id;
    } catch (error) {
      console.error("Error al agregar el producto: \n", error);
    }
  }

  getProducts() {
    try {
      const fileContents = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileContents);
    } catch (error) {
      return [];
    }
  }


getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      const updatedProduct = {
        ...products[productIndex],
        ...updatedFields,
        id: products[productIndex].id, 
      };
      products[productIndex] = updatedProduct;
      this.saveProducts(products);
      return updatedProduct;
    }
    return null;
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      this.saveProducts(products);
      return true;
    }
    return false;
  }

  saveProducts(products) {
    const jsonProducts = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, jsonProducts);
  }


}
module.exports = ProductManager;


/****************************** */

