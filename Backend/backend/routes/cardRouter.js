const router = require("express").Router();
const AddCards = require("../models/CardModel");

//insert card detail
router.post("/addCardDetail", async (req, res) => {
    console.log("inserted");

    const c = req.body;
    const newCard = new AddCards(c);
    try {
        await newCard.save();
        res.send({ success: "true", message: "card added successfully" });
    } catch (e) {
        console.log(e);
    }
});

//get all card details
router.get("/getCardDetails", async (req, res) => {
    try {
        const newCard = await AddCards.find();
        res.json(newCard);
    } catch (e) {
        console.log(e);
    }
});

//update card details
router.put("/updateCard/:id", (req, res) => {
    console.log("updating....");
    AddCards.findByIdAndUpdate(req.params.id, req.body)
        .then(res.json({ msg: "Updated successfully" }))
        .catch((err) =>
            res.status(400).json({ error: "Unable to update the Database" })
        );
});




//get single card
router.get("/getByCardId/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const card = await AddCards.findOne({ _id: id });
        res.json(card);
    } catch (e) {
        console.log(e);
    }
});



//delete
router.delete("/deleteCard/:id", (req, res) => {
    console.log("delete here ");
    AddCards.findByIdAndRemove(req.params.id, req.body)
        .then((book) => res.json({ mgs: "deleted successfully" }))
        .catch((err) => res.status(404).json({ error: "No such card" }));
});

module.exports = router;
