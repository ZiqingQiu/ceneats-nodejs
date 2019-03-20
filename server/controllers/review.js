let express = require('express');
let router = express.Router();

// create a reference to the db schema
let reviewModel = require('../models/review');


module.exports.displayItemList = (req, res, next) =>{
    reviewModel.find((err, reviewList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('items/index', {
                title: 'Review List',
                itemList: reviewList,
                displayName: req.user ? req.user.displayName : ""
            });
        }
    });
}