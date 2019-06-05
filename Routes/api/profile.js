const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator/check');

//@route   GET api/profile/me
//@desc    Get current user profile
//@access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({
        msg: '[api/profile] No profile found'
      })
    }

    res.json(profile)
  } catch (err) {

    console.error(err.message);
    res.status(500).send('[api/profile] Server Error')

  }

});


//@route   GET api/profile
//@desc    Create or update user profile
//@access  Private

router.post('/', [auth,
  [
    check('status', '[api/profile] Status is required')
      .not()
      .isEmpty(),
    check('skills', '[api/profile] Skills is required')
  ]
], (req, res) => {

})

module.exports = router;