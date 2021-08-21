const router = require('express').Router()

const Products = require('../models/productModel')

const Package = require('../models/packageModel')

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




// inserting product details to the product Document
router.post('/addPackage',async(req, res) =>{

    try {
        const {package_id, PackageName, price,description, images} = req.body;

        const package = await Package.findOne({package_id})
        if(package)
            return res.status(400).json({msg: "This package already exists."})

        const newProduct = new Package({
            package_id, PackageName: PackageName.toLowerCase(), price,description,  images
        })

        await newProduct.save()
        res.json({msg: "Created a package"})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

})






// retreiving  the product details from  product Document
router.get('/getPackage',async(req, res) =>{

    try {

console.log("inside the package")
        const features = new APIfeatures(Package.find(), req.query)
            .filtering().sorting().paginating()
        console.log("inside the package 1111111111")
        const products = await features.query
        console.log("inside the package 212121212")
        res.json({
            status: 'success',
            result: products.length,
            products: products
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }


})





// deleting the  product details from  product Document
router.delete('/deleteProducts/:id',async(req, res) =>{
    try {


        await Products.findByIdAndDelete(req.params.id)
        res.json({msg: "Deleted a Product"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }




})



// updating the  product details from  product Document
router.put('/updateProducts/:id',async(req, res) =>{

    try {
        const {title, price, description, content, images, category} = req.body;
        if(!images) return res.status(400).json({msg: "No image upload"})

        await Products.findOneAndUpdate({_id: req.params.id}, {
            title: title.toLowerCase(), price, description, content, images, category
        })

        res.json({msg: "Updated a Product"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }


})








module.exports = router