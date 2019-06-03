const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

//@route   POST api/users
//@desc    Register User
//@access  Public

router.post('/', [
  check('name',
    'Name is required')
    .not()
    .isEmpty(),
  check('email',
    'Please include a valid email')
    .isEmail(),
  check('password',
    'Please enter a password with 6 or more characters')
    .isLength({ min: 6 })
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Destructure so we can use 'name' instead of req.body.name etc
    const { name, email, password } = req.body;

    // old school --> User.findOne().then()
    // New -->

    try {

      // See if user exists
      let user = await User.findOne({
        email: email
      })

      if (user) {
        res.status(400).json({
          errors: [
            { msg: 'User already exists' }
          ]
        });
      }

      const avatar = gravatar.url(email,
        {
          s: '200',
          r: 'pg',
          d: 'mm'
        })

      user = new User({
        name,
        email,
        avatar,
        password
      });
      // Get users gravatar

      // Encrypt password

      // Return jsonwebtoken


      res.send('User route')

    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error')

    }




  });


module.exports = router;