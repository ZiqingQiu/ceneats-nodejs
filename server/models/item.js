let mongoose = require('mongoose');

// create a model class
let itemSchema = mongoose.Schema({
    itemId: String,
    restaurantName: String,
    itemName: String,
    quantity: Number,
    imageURL: String,
    price: Number
},
{
    collection: "items"
});

module.exports = mongoose.model('item', itemSchema);