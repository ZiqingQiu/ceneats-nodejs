let mongoose = require('mongoose');

// create a model class
let orderSchema = mongoose.Schema({
    cenId: String,
    foodId: String,
    quantity: Number,
    status: String,
    orderDate: Date
},
{
    collection: "orders"
});

module.exports = mongoose.model('order', orderSchema);