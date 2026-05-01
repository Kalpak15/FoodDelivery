const express  = require('express');
const cors = require('cors');   
const dbConnect = require('./config/database');
const Menu = require('./models/Menus');
const CartItem = require('./models/Cartitems');
const jwt  = require('jsonwebtoken')
require('dotenv').config();


const app = express();

const PORT  = process.env.PORT || 6001;
const sceretKey = process.env.STRIPE_SECRET_KEY
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




// Stripe Paymnent Routes
// This is your test secret API key.
// Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
const stripe = require('stripe')(sceretKey);

app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));