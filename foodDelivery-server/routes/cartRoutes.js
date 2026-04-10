const express = require('express')

const router = express.Router();


const {getCartsByEmail,addToCart} = require('../controllers/cartController')

router.get('/',getCartsByEmail)
router.post('/',addToCart)




module.exports = router