const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
let Product = require('../models/Product');

//route Get api/product
router.get('/', async (req, res) => {
  try {
    let data = await Product.find();
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
router.post('/cart', async(req, res) => {
  cartProducts = [];

  const cart = JSON.parse(req.body.cart);
  if (!cart) {
    return res.send(products)
  }
  for (const property in cart) {
    let id = property;
    let quantity = cart[property]
    //find id in database
    let p = await Product.findById(id);

    let newProduct = {
      name:p.name,
      qty:quantity,
      price:p.price
    };
    cartProducts.push(newProduct);
    
  }
  return res.send(cartProducts);
});

module.exports = router;