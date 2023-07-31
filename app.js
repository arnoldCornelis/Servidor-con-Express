
const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const port = process.env.PORT || 3000;

const productManager = new ProductManager('./productos.json');

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
  const { limit } = req.query;

  try {
    let products = await productManager.getProducts();

    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (!isNaN(parsedLimit)) {
        products = products.slice(0, parsedLimit);
      }
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid, 10);

  try {
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});