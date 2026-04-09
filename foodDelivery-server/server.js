const express  = require('express');
const cors = require('cors');   
const dbConnect = require('./config/database');
const Menu = require('./models/Menus');
const CartItem = require('./models/Cartitems');
require('dotenv').config();

const app = express();

const PORT  = process.env.PORT || 6001;

app.use(express.json());
app.use(cors())

dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 



app.get('/',(req,res)=>{
    return res.send('Food Delivery Server is running'); 
})

// get all menus
app.get('/menus',async(req,res)=>{
  try{
        const responce = await Menu.find()
   

        return res.status(200).send(responce)
  }
  catch(error){
    return res.status(500).json({
        message:"Not able to fetch"
    })
  }
})


// add carts to the  cartItem
app.post('/carts',async(req,res)=>{
   try{
         
       const cartItem = req.body

       const CartResponce = await CartItem.insertOne(cartItem)
       console.log(CartResponce)

       return res.status(200).json({
         message:"The updated Responce we get.",
         data:CartResponce
       })


   }
    catch(error){
        return res.status(500).json({
            message:"Not able to add item to cart"
        })
    }
    
})

// get arts according to query email
app.get('/carts',async(req,res)=>{
    try{
        
        const email = req.query.email
        const filter = {email:email}
        console.log(email)
        const AllCartItems = await CartItem.find(filter)
        console.log(AllCartItems)
        res.send(AllCartItems)
    }
    catch(error){
        return res.status(500).json({
            message:"Not able to Fetch item from cart"
        })
    }
    
})

app.get('/carts/:id',async(req,res)=>{
     try{
            const id = req.params.id
            const filter  = {_id: new ObjectId(id)}
            const responce = await CartItem.findOne(filter)
            res.send(responce)
     }
     catch(error){
         return res.status(500).json({
             message:"Not able to delete item from cart"
         })
        }
    })
    
    
    app.put('/carts/:id',async(req,res)=>{
        try{
              
             

        }
        catch(error){
            return res.status(500).json({
                message:"Not able to delete item from cart"
            })
    
   }
})


app.delete('/carts/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const filter  = {_id: new ObjectId(id)}
        const responce = await CartItem.deleteOne(filter)
        res.send(responce)
    }
    catch(error){
        return res.status(500).json({
            message:"Not able to delete item from cart"
        })
    }
})

