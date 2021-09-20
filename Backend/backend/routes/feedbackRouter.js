const router = require('express').Router()

const Feedback = require('../models/feedbackModel')

router.post('/submitFeedback',async(req, res) =>{

    try {
        // const {r} = req.body;
        console.log("feedback")
        const newFeedback = new Feedback(req.body);
        await newFeedback.save()
        res.json({msg: "Successfully Reservation Added"})

    } catch (err) {
        return res.status(500).json({msg: err.message})
        console.log(err.message)
    }
})

module.exports = router