const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    items: [
        {
            item: {
                type: mongoose.Types.ObjectId,
                ref:'Product'
            },
            count:Number
        }
    ],
    total:Number,
    name: String,
    mobileNumber: String,
    pincode: String,
    houseNumber: String,
    area: String,
    landmark: String,
    city: String,
    state:String
},{timestamps:true})

module.exports =  mongoose.model('Order', orderSchema);