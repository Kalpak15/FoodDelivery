const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: true,
        minlength: 3,
    },
    recipe:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

module.exports = mongoose.model('Menu', menuSchema);
