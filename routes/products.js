const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
let Product = require('../models/Product');

//route Get api/product
router.get('/', async (req, res) => {
  try {
    const data = await Product.find();
    res.send(data);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


//route Post api/product
router.post(
  '/',
  // auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('available_quantity', 'Available quantity is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const newProduct = new Product({
        name: req.body.name,
        available_quantity: req.body.available_quantity,
        description: req.body.description,
        price: req.body.price
      });

      const np = await newProduct.save();
      res.send(np);

    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

//route Post api/product/cart
//generates the list of products in the cart
router.post('/cart', (req, res) => {
  let products = [];
  let id = null;
  let cart = JSON.parse(req.body.cart);

  if (!cart) {
    return res.send(products)
  }

  for (var i = 0; i < data.products.length; i++) {
    id = data.products[i].id;
    

    if (cart.hasOwnProperty(id)) {
      data.products[i].qty = cart[id]
      products.push(data.products[i]);
    }
  }
  return res.send(products);
});

module.exports = router;