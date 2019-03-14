let express = require('express');
let router = express.Router();

// create a reference to the db schema
let orderModel = require('../models/order');

module.exports.displayContactList = (req, res, next) =>{
    orderModel.find((err, orderList) => {
        if(err) {
            return console.error(err);
        }
        else {
            res.render('contacts/index', {
                title: 'Order List',
                orderList: orderList,
                displayName: req.user ? req.user.displayName : ""
            });   
            console.log("dbg displayOrderList: " + orderList);        
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {    
    res.render('contacts/add', {
        title: 'Add New Contact',
        displayName: req.user ? req.user.displayName : ""
    });
}

module.exports.processAddPage = (req, res, next) => {

    let newOrder = orderModel({
        "cenId": req.body.cenid,
        "foodId": req.body.foodid,
        "quantity": req.body.quantity,
        "status": req.body.status,
        "orderDate": req.body.orderdate
    });

    orderModel.create(newOrder, (err, contactModel) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/contact-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    orderModel.findById(id, (err, orderObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the edit view
            res.render('contacts/edit', {
                title: 'Edit Contact',
                order: orderObject,
                displayName: req.user ? req.user.displayName : ""
            });
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedContact = orderModel({
        "_id": id,
        "cenId": req.body.cenid,
        "foodId": req.body.foodid,
        "quantity": req.body.quantity,
        "status": req.body.status,
        "orderDate": req.body.orderdate
    });

    orderModel.update({_id: id}, updatedContact, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/contact-list');
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    orderModel.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/contact-list');
        }
    });
}

