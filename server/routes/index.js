let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET offlinehome page. */
router.get('/offline', indexController.displayOfflineHomePage);

/* GET contact page. */
router.get('/contact', indexController.displayContactPage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET - displays statistics */
router.get('/stats', indexController.displayStatsPage);

/* GET - displays the Login Page */
router.get('/login', indexController.displayLoginPage);

/* POST - processes the Login Page */
router.post('/login', indexController.processLoginPage);

/* GET - displays the User Registration Page */
router.get('/register', indexController.displayRegisterPage);

/* POST - processes the User Registration Page */
router.post('/register', indexController.processRegisterPage);

/* GET - perform user logout */
router.get('/logout', indexController.performLogout);



module.exports = router;