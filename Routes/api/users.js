const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route   POST api/users
//@desc    Register User
//@access  Public

router.post('/', [
  check('name',
    '[api/users] Name is required')
    .not()
    .isEmpty(),
  check('email',
    '[api/users] Please include a valid email')
    .isEmail(),
  check('password',
    '[api/users] Please enter a password with 6 or more characters')
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
        return res.status(400).json({
          errors: [
            { msg: '[api/users] User already exists' }
          ]
        });
      }


      // Get users gravatar
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


      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save()

      // Return jsonwebtoken (in seconds)
      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          // console.log(token);
          res.json({ token });
        })




      // res.send('User registered')

    } catch (err) {
      console.log(err);
      res.status(500).send('[api/users] Server Error')

    }




  });


module.exports = router;