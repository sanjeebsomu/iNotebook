const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

JWT_SECRET = "sanjeebisagoodb$oy";

//Create an User using: POST "/api/auth/createuser".No login Required.
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email address').isEmail(),
    body('password', 'Password must contains atleast 5 charecters').isLength({ min: 5 }),
], async(req, res)=> {
  //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {//we are wrapping this code inside try and catch
      //Check wheather the user with the same email exists already

    let user = await User.findOne({email: req.body.email})
    if(user){
      //if user jas not the unique email, then return this error
      return res.status(400).json({error: "sorry a user with this email is already exists"})
    }
    salt = await bcrypt.genSalt(10)
    secPass = await bcrypt.hash(req.body.password, salt)
    //create user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      })
      const data = {
        user:{
          id: user.id//id is the fastest way
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
// res.json(user)
res.json({authToken})
      
} catch (error) {
      console.error(error.message)
      res.status(500).send("Some error occured")//it will display inside response
}
})

module.exports = router