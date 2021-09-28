const router = require('express').Router()
const Category = require('../models/categoryModel')
const Product = require('../models/productModel')


router.post('/category', async(req,res) =>{
    try {
        // if user have role = 1 ---> admin
        // only admin can create , delete and update category
        const {name} = req.body;
        const category = await Category.findOne({name})
        if(category) return res.status(400).json({msg: "This category already exists."})
        const newCategory = new Category({name})
        await newCategory.save()
        res.json({msg: "Created a category"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})


router.get('/category',async (req,res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})

//update
router.put('/category/:id',async (req, res) => {
    try {
        const {name} = req.body;
        await Category.findOneAndUpdate({_id: req.params.id}, {name})

        res.json({msg: "Updated a category"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
});




//delete
// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/category/:id',async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.json({msg: "Deleted a Category"})
    } catch (err) {
        return res.status(500).json("{msg: err.message}")
    }
});




module.exports = router
