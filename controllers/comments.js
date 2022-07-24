const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Comment = require('../models/Comment');
const Product = require('../models/Product');



// @desc Get all Comments
// @route GET/api/v1/comment
// @route GET/api/v1/products/:productid/comments
// @access Public

exports.getComments = asyncHandler( async (req, res, next) => {

    if(req.params.productId) {
        const comments = await Comment.find({product: req.params.productId}) 
        return res.status(200).json({
            success: true,
            count: comments.length,
            data: comments

        });  
    }else{
        const comments = await Comment.find() 
        return res.status(200).json({
            success: true,
            count: comments.length,
            data: comments

        });  
    }

    
});

// @desc Get single Comment
// @route GET/api/v1/products/:commentid
// @access Public

exports.getComment = asyncHandler( async (req, res, next) => {

    const comment = await Comment.find();

    res.status(200)
        .json({
            success: true,
            data: comment
        });
});

// @desc add a Comment
// @route POST/api/v1/products/comment
// @access Public

exports.addComment = asyncHandler( async (req, res, next) => {

    req.body.product = req.params.productId;

    const product = await Product.findById(req.params.productId)
    
    if(!product)
    {
        return next(
            new ErrorResponse(`No product with the id of ${req.params.storeId}`), 404)
    }


    const comment = await Comment.create(req.body);
    
        res.status(200)
        .json({
            success: true,
            data: comment
        });
});

// @desc Update comment
// @route PUT /api/v1/comment/:commentId
// @access public

exports.updateComment = asyncHandler( async (req, res, next) => {

    let comment = await Comment.findById(req.params.id);

    if(!comment)
    {
        return next(
            new ErrorResponse(`No comment with the id of ${req.params.id}`), 404)
    }

    comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    runValidators: true
    });

res.status(200)
.json({ success: true, data: comment });

})


// @desc Delete a comment
// @route DELETE /api/v1/comments/:id
// @access public

exports.deleteComment = asyncHandler( async (req, res, next) => {

    const comment = await Comment.findById(req.params.id);

    if(!comment)
    {
        return next(
            new ErrorResponse(`No comment with the id of ${req.params.id}`), 404)
    }

    comment.remove();

res.status(200)
.json({ success: true, data: {} });
  
  
    });
