const express = require('express')
const verifyToken = require("../middleware/verifyToken")
const router = express.Router();


const {getCartsByEmail,addToCart,deleteCart,updateCartQuantity,getCartById} = require('../controllers/cartController')

router.get('/',verifyToken,getCartsByEmail)
router.post('/',addToCart)
router.delete('/:id',deleteCart)
router.put('/:id',updateCartQuantity)
router.get('/:id',getCartById)
// router.put('/:id',getCartById)




module.exports = router