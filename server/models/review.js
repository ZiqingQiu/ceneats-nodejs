let mongoose = require('mongoose');

// create a model class
let reviewSchema = mongoose.Schema({
    displayName: {
        type: String,
        default: "",
        trim: true,
        required: "Display Name is required"
      },
      restaurantName: {
        type: String,
        default: "",
        trim: true,
        required: "Display Name is required"
      },
    comment : {
        type: String,
        default: "",
        trim: true,
        required: "Comment is required"
      }
    },
{
    collection: "reviews"
});

module.exports = mongoose.model('review', reviewSchema);