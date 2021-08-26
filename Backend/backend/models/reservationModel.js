const mongoose = require('mongoose')


const reservationSchema = new mongoose.Schema({
    title:{
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
    content:{
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
        default: 0
    },
    email:{
        type: String,
    }
}, {
    timestamps: true //important
})

module.exports = mongoose.model("Reservation1", reservationSchema)