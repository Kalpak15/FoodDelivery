const express  = require('express');
const cors = require('cors');   
const dbConnect = require('./config/database');
const Menu = require('./models/Menus');
const CartItem = require('./models/Cartitems');
const jwt  = require('jsonwebtoken')
require('dotenv').config();

const app = express();

const PORT  = process.env.PORT || 6001;

app.use(express.json());
app.use(cors())


dbConnect();

app.post('/jwt',async(req,res)=>{
     const  user = req.body
     const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
     res.status(200).json({token})
})


app.get('/',(req,res)=>{
    return res.send('Food Delivery Server is running'); 
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 





const menuRoutes = require('./routes/menuRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const veriftoken = require('./middleware/verifyToken');

app.use('/menus',menuRoutes)
app.use('/carts',cartRoutes)
app.use('/users',userRoutes)


// get all menus




// get arts according to query email



    
    







