let express = require('express');
let router = express.Router();

let itemController = require('../controllers/item');

function requireAuth(req, res, next) {
    // check if the user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET Item List page - READ Operation */
router.get('/:id', requireAuth, itemController.displayItemList);


/* POST Item List page - Make a new order */
router.post('/', requireAuth, itemController.displaySelecetedItem);


/* GET Route for the Add page 
   this will display the Add page */
router.get('/add/:id', requireAuth, itemController.displayAddPage);

/* POST Route for processing the Add page */
router.post('/add/:id', requireAuth, itemController.processAddPage);

/* GET request - display the Edit page */
router.get('/edit/:id', requireAuth, itemController.displayEditPage);

/* POST request - Update the database with data from the Edit Page */
router.post('/edit/:id', requireAuth, itemController.processEditPage);

/* GET request to perform the delete action */
router.get('/delete/:id', requireAuth, itemController.performDelete);

/* GET request to perform the view selected item action */
router.get('/placeorder', requireAuth, itemController.displaySelecetedItem);

/* POST request to perform the process selected item action */
router.post('/placeorder', requireAuth, itemController.processSelecetedItem);

module.exports = router;