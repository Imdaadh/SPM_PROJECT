
const router = require('express').Router()

const Payment = require('../models/payment')






//insert payment
router.post('/addPayment', async(req,res) =>{
    console.log("insertttt")

    const p = req.body;
    const newPayment = new Payment(p);
    try{
        await newPayment.save();
        res.send({success:'true',message:"payment done correctly"});
    }catch (e) {
        console.log(e);
    }
})


//get all payments
router.get('/getPayments',async (req,res) => {
    try{
        const payments = await Payment.find();
        res.json(payments);
    }catch (e) {
        console.log(e)
    }
})


router.put('/updatePayment/:id', (req, res) => {
    console.log("updating....")
    Payment.findByIdAndUpdate(req.params.id, req.body)
        .then(res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});



//get single payment
router.get('/getById/:id', async (req,res) =>{
    const id = req.params.id;
    console.log(id);
    try{
        const payments = await Payment.findOne({_id:id});
        res.json(payments);
    }catch(e) {
        console.log(e);
    }
})


//delete
// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/delete/:id', (req, res) => {
    console.log("delete here ")
    Payment.findByIdAndRemove(req.params.id, req.body)
        .then(book => res.json({ mgs: 'Book entry deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a book' }));
});

module.exports = router