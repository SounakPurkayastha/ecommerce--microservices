const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const paymentRoutes = require('./routes/payments');
const orderRoutes = require('./routes/orders');

const app = express();

mongoose.connect('mongodb+srv://sounakpurkayastha:tunir123%40@cluster0.hy3j0pn.mongodb.net/?retryWrites=true&w=majority').then(() => console.log("Database connection succesful"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/payments', paymentRoutes);
app.use('/orders', orderRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode;
    const message = error.message;
    res.send({ error: { statusCode: status, message: message } });
})

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});