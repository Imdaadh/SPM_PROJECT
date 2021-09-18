const router = require('express').Router()

const PackageReservation = require('../models/packagereservationModel')

router.post('/addPackageReservation',async(req, res) =>{

    try {
        console.log(req.body)
        const newReservation = new PackageReservation(req.body);
        await newReservation.save()
        res.json({msg: "Successfully Reservation Added"})

    } catch (err) {
        return res.status(500).json({msg: err.message})
        console.log(err.message)
    }
})

router.get('/getPackageReservation',async(req, res) =>{
    try{
        console.log(req.body)
        const newReservation = await PackageReservation.find();
        res.json({
            newReservation: newReservation
        })
    }catch(e){
        console.log(e)
    }
})




router.delete('/deletePackageReservation/:id', (req, res) => {
    // console.log("delete here ")
    PackageReservation.findByIdAndRemove(req.params.id, req.body)
        .then(book => res.json({ mgs: 'Reservation Successfully Deleted' }))
        .catch(err => res.status(404).json({ error: 'Delete Unsuccessful' }));
});


module.exports = router