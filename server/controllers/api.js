// include email function
let nodeMailer = require('nodemailer');

let userModel = require("../models/user");
let User = userModel.User; // alias

let orderModel = require("../models/order");

module.exports.sendEmail = (user_id) => {
    User.findOne({username: user_id}, (err, userObject) => {
        if(err) {
            return console.error("Can not find user: " + user_id + " with error: " +err);
        }
        else {
            // get email
            if (userObject == null) return;
            let tgt_email = userObject.email;
            // get latest order
            orderModel.findOne({cenId: user_id}, 
                {},
                {sort:{ _id: -1}},
                (err, orderObject) => {
                    if(err) {
                        return console.error(err);
                    }
                    let transporter = nodeMailer.createTransport({
                        service: 'gmail',
                        auth: {
                        user: 'ceneatsapp@gmail.com',
                        pass: 'ceneats201909'
                        }
                    });
                    text_str = 'student id: ' + orderObject.cenId + '\nfood id: ' + orderObject.foodId + '\nquantity: ' + orderObject.quantity;
                    let mailOptions = {
                        from: 'ceneats@gmail.com',
                        to: tgt_email,
                        subject: 'Order Confirmation Email: ' + orderObject._id,
                        html: '<b>' + text_str + '</b>' // html body
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        }
                    });
            });
        }
    });
}

