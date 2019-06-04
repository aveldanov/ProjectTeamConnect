const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


//@route   GET api/auth
//@desc    Test route
//@access  Public

router.get('/', auth, async (req, res) => {
  try {
    console.log('[api/auth] ', req.user);

    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('[api/auth] Server error')

  }
});


//@route   POST api/auth
//@desc    Authenticate User  and Get Token
//@access  Public

router.post('/', [

  check('email',
    'Please include a valid email')
    .isEmail(),
  check('password',
    'Password is required')
    .exists()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Destructure so we can use 'name' instead of req.body.name etc
    const { email, password } = req.body;

    // old school --> User.findOne().then()
    // New -->

    try {

      // See if user exists
      let user = await User.findOne({
        email: email
      })

      if (!user) {
        return res
          .status(400)
          .json({
            errors: [
              { msg: '[api/auth] Invalid credentials' }
            ]
          });
      }

      console.log('password ', password, 'user.password', user.password);

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({
            errors: [
              { msg: '[api/auth] Password is not correct' }
            ]
          });
      }




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
      res.status(500).send('Server Error')

    }




  });




module.exports = router;