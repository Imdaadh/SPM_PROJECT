const mongoose = require('mongoose')


const PreservationSchema = new mongoose.Schema({
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
    day:{
        type: Number,
    },
    date:{
        type: String,
    },
    images:{
        type: Object,
        required: false
    },
    total:{
        type: Number,
    },
    email:{
        type: String,
    }
}, {
    timestamps: true //important
})

module.exports = mongoose.model("PackageReservation", PreservationSchema)