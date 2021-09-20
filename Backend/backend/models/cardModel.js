const mongoose = require("mongoose");

const CardDetailSchema = new mongoose.Schema({
    cardType: { type: String, required: true },
    cardNumber: { type: Number, required: true },
    cardName: { type: String, required: true },
    cvv: { type: Number, required: true },
    expiryDate: { type: String, required: true },
});

module.exports = mongoose.model("cardDetails", CardDetailSchema);
