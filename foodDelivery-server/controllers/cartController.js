const CartItems = require('../models/Cartitems')

const getCartsByEmail = async(req,res)=>{
    try{
        
        const email = req.query.email
        const filter = {email:email}
        const AllCartItems = await CartItems.find(filter).exec()
        res.status(200).send(AllCartItems)
    }
    catch(error){
        return res.status(500).json({
            message:"Not able to Fetch item from cart"
        })
    }
    
}

 // add carts to the  cartItem
const addToCart = async(req,res)=>{
   
    try{
         const {menuItemId,name,email,recipe,quantity,price,image} = req.body

         const existingCartItem = await CartItems.findOne({menuItemId})

         if(existingCartItem){
            return res.status(500).json({
                message:"Item already exists in cart"
            })
         }

         const cartItem = await CartItems.create({
            menuItemId,
            name,
            email,
            recipe,
            quantity,
            price,
            image
         })

         return res.status(200).json(cartItem)       
    }

    catch(error){
        return res.status(500).json({
            message:"Not able to add item to cart"
        })
    }
    
}


module.exports = {getCartsByEmail,addToCart}