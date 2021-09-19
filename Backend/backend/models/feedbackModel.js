const mongoose = require('mongoose')


const feedBackSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    feedback:{
        type: String,
    },
    email:{
        type: String,
    }
}, {
    timestamps: true //important
})

module.exports = mongoose.model("feedback", feedBackSchema)