const express = require('express');
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

JWT_SECRET = "sanjeebisagoodb$oy";

//Route1: Create an User using: POST "/api/auth/createuser".No login Required.
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
      res.status(500).send("Internal Server Error")//it will display inside response
}
})



//Route 2: Authenticate a User using: POST "/api/auth/login".No login Required.
router.post('/login', [
  body('email', 'Enter a valid Email address').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async(req, res)=> {
//If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email, password} = req.body;
  try {

    //if entered email match with the existing email within database
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Please Login with Correct Credential"})
    }
    //now comparing password(use await, otherwise it will go to the next step without authorization and give them token)
    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
      return res.status(400).json({error: "Please Login with Correct Credential"})
    }

    //if all the credential matched then send the user data
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
    res.status(500).send("Internal Server Error")//it will display inside response
  }
})


//Route 3: Get Loggedin User Detail: POST "/api/auth/getuser". login Required.
router.post('/getuser', fetchuser, async(req, res) => {//with the help of fetch user now we get the user in our req.
try {
  userId = req.user.id
  const user = await User.findById(userId).select("-password")
  res.send(user)
}
catch (error) {
  console.error(error.message)
  res.status(500).send("Internal Server Error")//it will display inside response
}
})
module.exports = router