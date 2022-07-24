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

//Body parser
app.use(express.json());

//dev loggin middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    };


//bring in the router file
const products = require('./routes/products');
const comments = require('./routes/comments');

//Mount Router
app.use('/api/v1/products', products);
app.use('/api/v1/comments', comments);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));