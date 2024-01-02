const asyncHandler = require("../middleware/asyncHandler");
const productModel = require('../models/productModel');


// @desc Fetched all product
// @route GET /api/products
// @access Public
const getProducts = asyncHandler (async (req, res)=>{
    const products = await productModel.find({});
    res.status(200).send(products);
})


// @desc Fetched a specific product by its ID
// @route GET /api/products/:id
// @access Public
const getASpecificProduct = asyncHandler (async(req, res)=>{
    const {id} = req.params;
    const product = await productModel.findOne({_id:id});
    if(product)
   { res.status(200).send(product);}
    else{
        res.status(404);
        throw new Error('Product not found');
    }
})

module.exports = {getProducts, getASpecificProduct}