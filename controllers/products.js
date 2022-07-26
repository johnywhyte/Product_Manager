const path = require('path');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')
const Product = require('../models/Product');



// @desc Get all Products
// @route GET/api/v1/products
// @route GET /api/v1/Products
// @access Public

exports.getProducts = asyncHandler( async (req, res, next) => {

    const products = await Product.find().populate('comments');

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

    const product = await Product.findById(req.params.id).populate('comments');

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
// @access public

exports.addProduct = asyncHandler( async (req, res, next) => {


    //Add user to req.body
    req.body.user = req.user.id;

   const product = await Product.create(req.body);

        res.status(201)
        .json( {success: true, msg: product} );
})



// @desc Update Products
// @route PUT /api/v1/products/:productid
// @access public

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
// @access public

exports.deleteProduct = asyncHandler( async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product)
    {
        return next(
            new ErrorResponse(`No product with the id of ${req.params.id}`), 404)
    }

    product.remove();

res.status(200)
.json({ success: true, data: {} });
  
  
    });



// @desc product within a radius
// @route GET /api/v1/products/radius/:zipcode/:distance
// @access Public
exports.getProdcutsInRadius = asyncHandler (async (req, res, next) => {
  
    const {zipcode, distance} = req.params;
 
    //get the latitude and logitude
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
 
 
    //calc radius using radians
    //divide distance by radius of the earth 3,963mi / 6,378km
 
     const radius = distance / 3963;
 
     const products = await Product.find({
         location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
     })
 
 
   res.status(200).json({
     success: true,
     count: products.length,
     data: products
   });
 
 });
 



// @desc upload photo to product
// @route PUT /api/v1/products/:id/image
// @access Public
exports.productImageUpload = asyncHandler (async (req, res, next) => {
  
    const product = await Product.findById(req.params.id);

    if(!product) {
      return  next(new ErrorResponse(`Product not found with the id of ${req.params.id}`, 404));
  }

  if(!req.files){
    return  next(new ErrorResponse(`Please Upload a File`, 400));
  }

  const file = req.files.file;

  if(!file.mimetype.startsWith('image')){
    return  next(new ErrorResponse(`Please Upload an Image`, 400));
  }

  //check file size
  if(file.size > process.env.MAX_FILE_UPLOAD){
    return  next(new ErrorResponse(`Please Upload an Image with a size less than ${process.env.MAX_FILE_UPLOAD}`, 400));
  }

  //Create custom name property
  file.name = `image${product._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
      if(err){
          console.log(err);
          return  next(new ErrorResponse(`Problem with file upload`, 400));
      }

      await Product.findByIdAndUpdate(req.params.id, {image: file.name})

      res.status(200).json({
          success: true,
          data: file.name,
      });
      
  });

  console.log(file.name);



});
 