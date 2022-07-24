const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Product = require('../models/Product');



// @desc Get all Products
// @route GET/api/v1/products
// @route GET /api/v1/Products
// @access Public

exports.getProducts = asyncHandler( async (req, res, next) => {

    const products = await Product.find();

    res.status(200)
        .json({
            success: true,
            data: products
        });
});


// @desc Get a single Products
// @route GET /api/v1/products/:id
// @access Public

exports.getProduct = asyncHandler( async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product)
    {
        return next(
            new ErrorResponse(`No product with the id of ${req.params.id}`), 404)
    }

    res.status(200)
        .json( {success: true, data: product });
})



// @desc Add a Products
// @route POST /api/v1/products
// @access Private

exports.addProduct = asyncHandler( async (req, res, next) => {
   console.log(req.body);
   const product = await Product.create(req.body);

        res.status(201)
        .json( {success: true, msg: product} );
    })



// @desc Update Products
// @route PUT /api/v1/stores/:storeid/products
// @access Private

exports.updateProduct = asyncHandler( async (req, res, next) => {

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        runValidators: true
        });

        if(!product)
        {
            return next(
                new ErrorResponse(`No product with the id of ${req.params.id}`), 404)
        }

    res.status(200)
    .json({ success: true, data: product });

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