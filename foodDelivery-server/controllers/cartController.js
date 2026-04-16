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


// app.delete('/carts/:id',

const deleteCart=async(req,res)=>{
    try{
        const id = req.params.id
        const responce = await CartItems.findByIdAndDelete(id)
        if(!responce){
            return res.status(404).json({
                message:"Cart item not found"
            })
        }
        
        return res.status(200).json({
            message:"Cart item deleted successfully"
        })

    }
    catch(error){
        return res.status(500).json({
            message:"Not able to delete item from cart"
        })
    }
}


// Update cart item quantity  app.put('/carts/:id',

const updateCartQuantity = async(req,res)=>{
       
    try{
        const id =  req.params.id
        const {menuItemId,name,recipe,image,price,quantity,email} = req.body
      

        const responce = await CartItems.findByIdAndUpdate(id,{menuItemId,name,recipe,image,price,quantity,email},{new:true,runValidators:true})
        
        if(!responce){
            return res.status(404).json({
                message:"Cart item not found"
            })
        }

        res.status(200).send(responce)
    }

    catch(error){
        return res.status(500).json({
            message:"Not able to update item from cart"
        })
    }

}



// get single cart item by id app.get('/carts/:id',
const getCartById = async(req,res)=>{
     try{
            const id = req.params.id
            const responce = await CartItems.findById(id)
            res.status(200).send(responce)
     }
     catch(error){
         return res.status(500).json({
             message:"Not able to fetch item from cart"
         })
    }
}
    

module.exports = {getCartsByEmail,addToCart,deleteCart,updateCartQuantity,getCartById}