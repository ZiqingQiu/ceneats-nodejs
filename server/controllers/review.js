let express = require('express');
let router = express.Router();
let mongoose = require('mongoose')

// create a reference to the db schema
let reviewModel = require('../models/review');


module.exports.displayReviewList = (req, res, next) => {
    reviewModel.find((err, reviewList) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('reviews/index', {
                title: 'Review List',
                reviewList: reviewList,
                displayName: req.user ? req.user.displayName : ""
            });
        }
    });
}
module.exports.displayAddPage = (req, res, next) => {
    res.render('reviews/add', {
        title: 'Add New Review',
        displayName: req.user ? req.user.displayName : ""
    });
}

module.exports.processAddPage = (req, res, next) => {

    let newReview = reviewModel({
        "displayName": req.body.displayName,
        "restaurantName": req.body.restaurantName,
        "comment": req.body.comment,
    });

    reviewModel.create(newReview, (err, contactModel) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the contact list
            res.redirect('/review-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        reviewModel.findById(id, (err, reviewObject) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                // show the edit view
                res.render('reviews/edit', {
                    title: 'Edit Review',
                    review: reviewObject,
                    displayName: req.user ? req.user.displayName : ""
                });
            }
        });
    }
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedReview = reviewModel({
        "_id": id,
        "displayName": req.body.displayName,
        "restaurantName": req.body.restaurantName,
        "comment": req.body.comment,
    });

    reviewModel.update({ _id: id }, updatedReview, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the contact list
            res.redirect('/review-list');
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    reviewModel.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the contact list
            res.redirect('/review-list');
        }
    });
}