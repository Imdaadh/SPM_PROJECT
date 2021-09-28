
const router = require('express').Router()

const Payment = require('../models/payment')

//////ahmed/////////
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


//////ahmed ///////////




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


//get all payments saajid
// router.get('/getPayments',async (req,res) => {
//     try{
//
//
//         const payments = await Payment.find();
//         res.json(payments);
//     }catch (e) {
//         console.log(e)
//     }
// })


///ahmed
// retreiving  the product details from  product Document
router.get('/getPayments',async(req, res) =>{

    try {

        console.log("inside paymnet")

        const features = new APIfeatures(Payment.find(), req.query)
            .filtering().sorting().paginating()

        const products = await features.query

        console.log(" paymnet issss : "+products.length)

        res.json({
            status: 'success',
            result: products.length,
            products: products
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }


})

//update
router.put('/updatePayment/:id', (req, res) => {
    console.log("updating....")
    Payment.findByIdAndUpdate(req.params.id, req.body)
        .then(res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

//extra sample

//get single payment
router.get('/getById/:id', async (req,res) =>{
    console.log("update")
    const id = req.params.id;
    console.log(id);
    try{
        const payments = await Payment.findById(req.params.id);
        console.log(payments)
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
