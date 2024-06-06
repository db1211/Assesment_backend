const express = require('express')
const authMiddleware = require('../Middleware/authMiddleware')
const ProductsController = require("../Controllers/ProductsController")

const router = express.Router();

router.get("/all",ProductsController.getAllProducts)
router.post('/addproducts',authMiddleware.tokenVerification,ProductsController.addProduct)


module.exports = router 


