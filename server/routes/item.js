let express = require('express');
let router = express.Router();

let itemController = require('../controllers/item');

function requireAuth(req, res, next) {
    // check if the user is logged in
    //### TBD
    // if(!req.isAuthenticated()) {
    //     return res.redirect('/login');
    // }
    next();
}

/* GET Contact List page - READ Operation */
router.get('/', requireAuth, itemController.displayItemList);

/* GET Route for the Add page 
   this will display the Add page */
router.get('/add', requireAuth, itemController.displayAddPage);

/* POST Route for processing the Add page */
router.post('/add', requireAuth, itemController.processAddPage);

/* GET request - display the Edit page */
router.get('/edit/:id', requireAuth, itemController.displayEditPage);

/* POST request - Update the database with data from the Edit Page */
router.post('/edit/:id', requireAuth, itemController.processEditPage);

/* GET request to perform the delete action */
router.get('/delete/:id', requireAuth, itemController.performDelete);

module.exports = router;