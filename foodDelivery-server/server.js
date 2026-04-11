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



    
    







