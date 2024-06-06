const express = require('express')
const router = express.Router();
const userController = require('../Controllers/userController')
const userProfile = require('../Controllers/userprofileController')
const authMiddleware = require('../Middleware/authMiddleware')





//auth
router.post("/signup",userController.SignUp)
router.post("/login",userController.Login)
router.post('/logout',userController.Logout);

//profile
router.route('/userprofile')
    .get(authMiddleware.tokenVerification, userProfile.getUserProfile)
    .put(authMiddleware.tokenVerification, userProfile.UpdateUserProfile);

module.exports = router
