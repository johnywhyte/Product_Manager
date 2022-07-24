const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [10, 'Please add a title']
    },
    message: {
        type: String,
        trim: true,
        required: [10, 'Please add a description']

    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    }
})

module.exports = mongoose.model('Comment', CommentSchema);