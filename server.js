const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/errors')

const connectDB = require('./config/db');




//load env vars
dotenv.config({ path: './config/config.env' });

//connect to db
connectDB();

const app = express();

//dev loggin middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    };


//bring in the router file
const products = require('./routes/products');

//Mount Router
app.use('/api/v1/products', products);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));