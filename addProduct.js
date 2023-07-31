const ProductManager = require('./productManager');

const PM = new ProductManager('./productos.json');

const newProduct = {
  title: 'Producto 1',
  description: 'Descripción del producto 1',
  price: 10.99,
  thumbnail: 'path/to/product1.jpg',
  code: 'P001',
  stock: 50,
};

PM.addProduct(newProduct)
  .then(productId => {
    console.log(`Producto agregado con ID: ${productId}`);
  })
  .catch(error => {
    console.error('Error al agregar el producto:', error);
  });

