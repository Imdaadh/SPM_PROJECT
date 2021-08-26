const router = require('express').Router()

const Reservation = require('../models/reservationModel')


router.post('/addReservation',async(req, res) =>{

    try {
        // const {r} = req.body;
        console.log(req.body)
        const newReservation = new Reservation(req.body);
        await newReservation.save()
        res.json({msg: "Successfully Reservation Added"})

    } catch (err) {
        return res.status(500).json({msg: err.message})
        console.log(err.message)
    }
})

router.get('/getReservation',async(req, res) =>{
    try{
        const newReservation = await Reservation.find();
        res.json({
            newReservation: newReservation
        })
    }catch(e){
        console.log(e)
    }
})



module.exports = router