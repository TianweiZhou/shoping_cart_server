// const express = require('express');
// const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');
// let User = require('../models/User');

// router.post(
//   '/',
//   [
//     check('name', 'Name is required').not().isEmpty(),
//     check('email', 'Please enter valid email').isEmail(),
//     check('password', 'Please enter password with 5 or more').isLength({min: 5})
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }

//     try {
//       let user1 = await User.findOne({ email: req.body.email });
//       if (user1) {
//         return res.status(400).json({ error: [{ msg: 'User already exits' }] });
//       }

//       const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//       });

//       const salt = await bcrypt.genSalt(10);
//       newUser.password = await bcrypt.hash(req.body.password, salt);
//       await newUser.save();

//       const payload = {
//         user: {
//           id: newUser.id,
//           name: newUser.name
//         }
//       };

//       jwt.sign(
//         payload,
//         config.get('jwtsecret'),
//         { expiresIn: 360000 },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       res.status(500).send(err.message);
//     }
//   }
// );

// module.exports = router;