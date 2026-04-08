const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    menuItemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Menu"
    },
    name: {
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    price:{
        type: Number,
        required:true    
    },
    image:{
        type: String,
        required:true    
    }

})

module.exports = mongoose.model('CartItem', cartItemSchema);
