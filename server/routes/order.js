let express = require('express');
let router = express.Router();

let orderController = require('../controllers/order');

function requireAuth(req, res, next) {
    // check if the user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET Contact List page - READ Operation */
router.get('/', requireAuth, orderController.displayOrderList);

/* GET Route for the Add page 
   this will display the Add page */
router.get('/add', requireAuth, orderController.displayAddPage);

/* POST Route for processing the Add page */
router.post('/add', requireAuth, orderController.processAddPage);

/* GET request - display the Edit page */
router.get('/edit/:id', requireAuth, orderController.displayEditPage);

/* POST request - Update the database with data from the Edit Page */
router.post('/edit/:id', requireAuth, orderController.processEditPage);

/* GET request to perform the delete action */
router.get('/delete/:id', requireAuth, orderController.performDelete);

module.exports = router;