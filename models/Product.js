const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')


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
    },

  

},
{
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
}

);


//Geocode and create location field
ProductSchema.pre('save', async function(next){
  const loc = await geocoder.geocode(this.address)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  }

  //do not save address in db
  this.address = undefined;
next()
})


//Cascade delete comments when a product is deleted
ProductSchema.pre('remove', async function (next){
  await this.model('Comment').deleteMany({bootcamp: this._id});
  next()
})

//reverse populate with virtuals
ProductSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'product',
  justOne: false
})

module.exports = mongoose.model('Product', ProductSchema);