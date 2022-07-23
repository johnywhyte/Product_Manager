const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Product = require('../models/Product');



// @desc Get all Products
// @route GET/api/v1/products
// @route GET /api/v1/stores/:storeId/Products
// @access Public

exports.getProducts = asyncHandler( async (req, res, next) => {
    res.status(200)
    .json(
        "ADDPRODUCT"
    );
});


// @desc Get a single Products
// @route GET /api/v1/products/:id
// @access Public

exports.getProduct = asyncHandler( async (req, res, next) => {

    res.status(200)
        .json(
            "ADDPRODUCT"
        );
})



// @desc Add a Products
// @route POST /api/v1/stores/:storeid/products
// @access Private

exports.addProduct = asyncHandler( async (req, res, next) => {
   
        res.status(200)
        .json(
            "ADDPRODUCT"
        );
    })



// @desc Update Products
// @route PUT /api/v1/stores/:storeid/products
// @access Private

exports.updateProduct = asyncHandler( async (req, res, next) => {


    res.status(200)
    .json(
        "ADDPRODUCT"
    );

    })


// @desc Delete a Product
// @route DELETE /api/v1/products/:id
// @access Private

exports.deleteProduct = asyncHandler( async (req, res, next) => {

    
    res.status(200)
    .json(
        "ADDPRODUCT"
    );
    })