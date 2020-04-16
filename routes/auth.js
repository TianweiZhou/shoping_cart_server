
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
let User = require('../models/User');

router.post('/', async (req, res) => { //signs in user
    let user = await User.findOne({ email: req.body.email });
    let psw = req.body.password;
    if(user.password == psw){

        // create a token using user name and password vaild for 2 hours
        let token_payload = { email: user.email, password: user.password };
        let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
        let response = {
            message: 'Token Created, Authentication Successful!',
            token: token
        };
        // return the information including token as JSON
        return res.status(200).json(response);
    } else {
        return res.status("401").json("Authentication denied.");
    }
});

module.exports = router;