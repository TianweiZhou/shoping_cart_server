const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    available_quantity:{
        type: Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type: Number,
        require:true
    }
    
});

const Product = mongoose.model('product', ProductSchema, 'Products');
module.exports = Product;