const jwt = require('jsonwebtoken')
const User = require("../models/userModel.js")


const tokenVerification = async (req, res, next) => {

    console.log("_______tokenVerificaion_____")
    let token = req.cookies.jwt
    console.log("token",req.cookies)

    if (token) {
        try {
            const decoded =  jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password');
            
            
            console.log(">>>>>PASSED>>>>>>")
            next();
            
        } catch (err){
            console.error(error);
            res.status(401);
            // throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        // throw new Error('Not authorized, no token');
    }

}

module.exports = { tokenVerification }