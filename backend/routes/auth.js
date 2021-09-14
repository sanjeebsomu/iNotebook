const express = require('express');
const User = require('../models/User');
const router = express.Router()

//Create an User using: POST "/api/auth". Doesn't require authentication.
router.post('/', (req, res)=> {
    const user = User(req.body);//data of user according to req.body
    user.save()
    console.log(req.body);
    res.send(req.body)
})

module.exports = router