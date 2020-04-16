const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');

router.get('/', middleware, (req, res) => { //checkout route for signed in users
    return res.json("Payment Successful!");
});

module.exports = router;