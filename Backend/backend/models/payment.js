const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    cardType:{type:String, required:true},
    cardNumber:{type:Number, required:true},
    cardName:{type:String, required:true},
    cvv:{type:Number, required:true},
    expiryDate:{type:Number, required:true}
});



module.exports = mongoose.model("payments", ProductSchema)