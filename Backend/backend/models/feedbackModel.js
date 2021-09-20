const mongoose = require('mongoose')


const feedBackSchema = new mongoose.Schema({
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