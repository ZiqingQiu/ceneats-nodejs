let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// define the User Model
let userModel = require("../models/user");
let User = userModel.User; // alias

let itemModel = require("../models/item");

module.exports.displayHomePage = (req, res, next) => {
    res.render("index", {
        title: "Home",
        displayName: req.user ? req.user.displayName : ""
    });
};

//display item list
module.exports.processHomePage = (req, res, next) => {
    res.redirect('/item-list');
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render("index", {
        title: "About",
        displayName: req.user ? req.user.displayName : ""
    });
};

module.exports.displayReviewPage = (req, res, next) => {
    res.render("review-list", {
        title: "Services",
        displayName: req.user ? req.user.displayName : ""
    });
};

module.exports.displayContactPage = (req, res, next) => {
    res.render("index", {
        title: "Contact",
        displayName: req.user ? req.user.displayName : ""
    });
};

module.exports.displayLoginPage = (req, res, next) => {
    // check if user is already logged in
    if (!req.user) {
        res.render("auth/login", {
            title: "Login",
            messages: req.flash("loginMessage"),
            displayName: req.user ? req.user.displayName : ""
        });
    } else {
        return res.redirect("/");
    }
};

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            // server error?
            if (err) {
                return next(err);
            }
            // is there a user login error?
            if (!user) {
                req.flash("loginMessage", "Authentication Error");
                return res.redirect('/login');
            }
            req.logIn(user, (err) => {
                // server error?
                if (err) {
                    return next(err);
                }
                return res.redirect('/order-list');
            });
        })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if (!req.user) {
        res.render("auth/register", {
            title: "Register",
            messages: req.flash("registerMessage"),
            displayName: req.user ? req.user.displayName : ""
        });
    } else {
        return res.redirect("/");
    }
};

module.exports.processRegisterPage = (req, res, next) => {
    // define a new user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        displayName: req.body.displayName,
        accountType: req.body.accountType
    });
    console.log("dbg processRegisterPage [accountType]: " + req.body.accountType);


    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting New User: " + err.name);
            if (err.name == "UserExistsError") {
                req.flash(
                    "registerMessage",
                    "Registration Error: User Already Exists!"
                );
                console.log("Error: User Already Exists!");
            }
            return res.render("auth/register", {
                title: "Register",
                messages: req.flash("registerMessage"),
                displayName: req.user ? req.user.displayName : ""
            });
        } else {
            // if no error exists, then registration is successful

            // redirect the user
            return passport.authenticate("local")(req, res, () => {
                res.redirect("/order-list");
            });
        }
    });
};

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect("/");
};
