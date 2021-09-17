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


router.delete('/deleteReservation/:id', (req, res) => {
    // console.log("delete here ")
    Reservation.findByIdAndRemove(req.params.id, req.body)
        .then(book => res.json({ mgs: 'Reservation Successfully Deleted' }))
        .catch(err => res.status(404).json({ error: 'Delete Unsuccessful' }));
});


router.put('/updateReservation/:id', (req, res) => {
    // console.log("imdaadd"+req.body.day)
    Reservation.findByIdAndUpdate(req.params.id, req.body)
        .then(res.json({ msg: 'Updated Reservation Details successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Update Reservation Unsuccessful' })
        );
});


module.exports = router