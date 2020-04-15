const express = require('express');
const productRoute = require('./routes/products');
const connectDB = require('./config/connectDB');
const app = express();
const cors = require('cors');

//connect to db
connectDB();

//set a middleware to parse data
app.use(express.json());

app.use(cors());

app.use('/api/product', productRoute);
app.listen(5000);