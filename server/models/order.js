let mongoose = require('mongoose');
let dateFormat = require('dateformat');

// create a model class
let orderSchema = mongoose.Schema({
    cenId: String,
    foodId: String,
    quantity: Number,
    status: String,
    orderDate: {
        type: String,
        default: dateFormat(new Date(), "ddd mmm dd yyyy HH:MM:ss")
    }
},
    {
        collection: "orders"
    });

module.exports = mongoose.model('order', orderSchema);