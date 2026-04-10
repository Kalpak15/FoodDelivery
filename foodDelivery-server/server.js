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


const menuRoutes = require('./routes/menuRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/menus',menuRoutes)
app.use('/carts',cartRoutes)



// get all menus




// get arts according to query email


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

app.put('/carts/:id',async(req,res)=>{
       
    try{
        const id =  req.params.id
        const quantity = req.body.quantity
        const filter = {_id: new ObjectId(id)};
        const options = {upsert:true}
 
        const updateDoc = {
            $set: {
                quantity: parseInt(quantity, 10)
            }
        };

        const responce = await CartItem.updateOne(filter,updateDoc,options)
        res.send(responce)
    }
    catch(error){
        return res.status(500).json({
            message:"Not able to update item from cart"
        })
    }

       
})



