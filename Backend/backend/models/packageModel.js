const mongoose = require('mongoose')


const packageSchema = new mongoose.Schema({
    package_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    PackageName:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,

    },

    images:{
        type: Object,
        required: true
    }


}, {
    timestamps: true //important
})


module.exports = mongoose.model("Package", packageSchema)