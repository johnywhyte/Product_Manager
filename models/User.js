const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const geocoder = require('../utils/geocoder')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
      password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 4,
        select: false
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
      resetPasswordToken: String,
      resetPasswordExpire: Date,
      createdAt: {
        type: Date,
        default: Date.now
      }
     

})


//Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
      next()
    }
  
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  });

//Sign JWT and return

UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_EXPIRE
    });
  };

 //Match user entered password to hashed password in database
 UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};
  



//Geocode and create location field
UserSchema.pre('save', async function(next){
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
    // this.address = undefined;
  next()
  })

module.exports = mongoose.model('User', UserSchema);
