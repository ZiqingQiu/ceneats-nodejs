let express = require('express');
let router = express.Router();

// create a reference to the db schema
let itemModel = require('../models/item');
let orderModel = require('../models/order');

module.exports.displayItemList = (req, res, next) =>{
    itemModel.find((err, itemList) => {
        if (err) {
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

module.exports.displaySelecetedItem = (req, res, next) => {
    //find item
    let id = req.params.id;
    let session = req.session;
    session.curselitemid = id;
    itemModel.findById(id, (err, itemObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else
        {
            //routing to place order view
            res.render('items/placeorder', {
                title: 'Place Order',
                item: itemObject,
                displayName: req.user ? req.user.displayName : ""
            });
        }
    });
}

module.exports.processSelecetedItem = (req, res, next) => {

    //update item inventory
    let remainInventory = req.body.inventory - req.body.quantity;
    let updatedItem = itemModel({
        "_id": req.session.curselitemid,
        "itemId": req.body.itemId,
        "restaurantName": req.body.resName,
        "itemName": req.body.itemName,
        "quantity": remainInventory,
        "imageURL": req.body.itemURL,
        "price": req.body.price
    });

    itemModel.update({itemId: req.body.itemId}, updatedItem, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
    })   

    //add item to order
    let newOrder = orderModel({
        "cenId": req.user.username,
        "foodId": req.body.itemId,
        "quantity": req.body.quantity,
        "status": "Ordered"
    });

    orderModel.create(newOrder, (err, contactModel) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/order-list');
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

