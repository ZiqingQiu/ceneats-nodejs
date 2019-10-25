let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// define the User Model
let userModel = require("../models/user");
let User = userModel.User; // alias

let itemModel = require("../models/item");

function getCurrentTime() {
    var day = new Date();
    var dayOfWeek;
    switch (day.getDay()) {
        case 0:
            dayOfWeek = "Sunday";
            break;
        case 1:
            dayOfWeek = "Monday";
            break;
        case 2:
            dayOfWeek = "Tuesday";
            break;
        case 3:
            dayOfWeek = "Wednesday";
            break;
        case 4:
            dayOfWeek = "Thursday";
            break;
        case 5:
            dayOfWeek = "Friday";
            break;
        case 6:
            dayOfWeek = "Saturday";
            break;
    }
    var seconds = Math.floor(Date.now() / 1000);
    var minutes = Math.floor(seconds / 60);
    seconds %= 60;
    var hours = Math.floor(minutes / 60);
    minutes %= 60;
    hours %= 24;
    hours -= 4;
    console.log('TIME RIGHT NOW: ' + hours + ':' + minutes + ':' + seconds);
    return { day: dayOfWeek, hour: hours, minute: minutes, second: seconds };
}

module.exports.displayHomePage = (req, res, next) => {
    res.render("index", {
        title: "Home",
        displayName: req.user ? req.user.displayName : "",
        time: getCurrentTime()
    });
};

module.exports.displayOfflineHomePage = (req, res, next) => {
    res.render("offline");
};

module.exports.displayAboutPage = (req, res, next) => {
    res.render("index", {
        title: "About",
        displayName: req.user ? req.user.displayName : "",
        time: getCurrentTime()
    });
};

module.exports.displayReviewPage = (req, res, next) => {
    res.render("review-list", {
        title: "Services",
        displayName: req.user ? req.user.displayName : "",
        time: getCurrentTime()
    });
};

module.exports.displayContactPage = (req, res, next) => {
    res.render("index", {
        title: "Contact",
        displayName: req.user ? req.user.displayName : "",
        time: getCurrentTime()
    });
};

module.exports.displayStatsPage = (req, res, next) => {
    res.render("stats/index", {
        title: "Statistics",
        displayName: req.user ? req.user.displayName : "",
        time: getCurrentTime()
    });
};

module.exports.displayLoginPage = (req, res, next) => {
    // check if user is already logged in
    if (!req.user) {
        res.render("auth/login", {
            title: "Login",
            messages: req.flash("loginMessage"),
            displayName: req.user ? req.user.displayName : "",
            time: getCurrentTime()
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
                return res.redirect('/');
            });
        })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    if (!req.user) {
        res.render("auth/register", {
            title: "Register",
            messages: req.flash("registerMessage"),
            displayName: req.user ? req.user.displayName : "",
            time: getCurrentTime()
        });
    } else {
        return res.redirect("/");
    }
};

module.exports.processRegisterPage = (req, res, next) => {
    // define a new user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        //password: req.body.password
        displayName: req.body.displayName,
        accountType: req.body.accountType
    });

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
                displayName: req.user ? req.user.displayName : "",
                time: getCurrentTime()
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