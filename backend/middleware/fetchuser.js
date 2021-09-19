const jwt = require('jsonwebtoken');
JWT_SECRET = "sanjeebisagoodb$oy";


const fetchuser = (req, res, next) =>{
//Get the user from jwt token and add id to req object
        const token = req.header('auth-token');//this is the header from thunder client
        if(!token){
            res.status(401).send({error: "Please authenticate using valid token"})
        }
        try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;//user data ko request me bhejdo
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using valid token"})
    }
}


module.exports = fetchuser