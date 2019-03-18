let express = require('express');
let router = express.Router();

// create a reference to the db schema
let itemModel = require('../models/item');

module.exports.displayItemList = (req, res, next) =>{
    itemModel.find((err, itemList) => {
        if(err) {
            return console.error(err);
        }
        else {
            res.render('items/index', {
                title: 'Item List',
                itemList: itemList,
                displayName: req.user ? req.user.displayName : ""
            });        
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {    
    res.render('items/add', {
        title: 'Add New Item',
        displayName: req.user ? req.user.displayName : ""
    });
}

module.exports.processAddPage = (req, res, next) => {

    let newItem = itemModel({
        "itemId": req.body.itemId,
        "restaurantName": req.body.resName,
        "itemName": req.body.itemName,
        "quantity": req.body.quantity,
        "imageURL": req.body.itemURL,
        "price": req.body.price        
    });

    itemModel.create(newItem, (err, itemModel) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the item list
            res.redirect('/item-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    itemModel.findById(id, (err, itemObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the edit view
            res.render('items/edit', {
                title: 'Edit Order',
                item: itemObject,
                displayName: req.user ? req.user.displayName : ""
            });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedItem = itemModel({
        "_id": id,
        "itemId": req.body.itemId,
        "restaurantName": req.body.resName,
        "itemName": req.body.itemName,
        "quantity": req.body.quantity,
        "imageURL": req.body.itemURL,
        "price": req.body.price
    });

    itemModel.update({_id: id}, updatedItem, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the item list
            res.redirect('/item-list');
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    itemModel.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the item list
            res.redirect('/item-list');
        }
    });
}

