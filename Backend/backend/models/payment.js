const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    cardType:{type:String, required:true},
    cardNumber:{type:Number, required:true},
    cardName:{type:String, required:true},
    cvv:{type:Number, required:true},
    expiryDate:{type:String, required:true}
});

//sample

module.exports = mongoose.model("payments", ProductSchema)