let mongoose = require('mongoose');

// create a model class
let itemSchema = mongoose.Schema({
    restaurantName: String,
    itemName: String,
    quantity: Number,
    stockStatus: String,
    imageURL: String,
    price: Number
},
{
    collection: "item"
});

module.exports = mongoose.model('item', itemSchema);