const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: [10, 'Please add a title']
    },
    description: {
        type: String,
        trim: true,
        required: [10, 'Please add a description']
    },
    img: { 
        type: String, 
        required: true 
    },
    categories: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
          'Electronics',
          'Wears',
        ]
      },
    price: { 
        type: Number, 
        required: true 
    },
    quantity: {
        type: Number,
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
      },
      location: {
        // GeoJSON Point
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String,
          street: String,
          city: String,
          state: String,
          zipcode: String,
          country: String
        },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [String],
        required: true,
        enum: [
          'Available',
          'Sold Out',
          'Awaiting Delivery',
        ]
    }

  

})

module.exports = mongoose.model('Product', ProductSchema);