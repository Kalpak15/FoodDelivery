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



app.post('/carts',async(req,res)=>{
   try{
         
       const{menuItemId,name,email,quantity,price,image} = req.body

       const CartResponce = await CartItem.insertOne({menuItemId,name,email,quantity,price,image})
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
