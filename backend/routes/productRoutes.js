const express = require('express');
const productRouter = express.Router();
const { getProducts, getASpecificProduct } = require('../controllers/productController');


// @desc Fetched all product
// @route GET /api/products
// @access Public
productRouter.route("/").get(getProducts);




// @desc Fetched a specific product by its ID
// @route GET /api/products/:id
// @access Public
productRouter.route('/:id').get(getASpecificProduct);



module.exports = productRouter;