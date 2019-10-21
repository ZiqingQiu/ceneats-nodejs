let express = require('express');
let router = express.Router();

let reviewController = require('../controllers/review');

function requireAuth(req, res, next) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET review List page - READ Operation */
router.get('/', requireAuth, reviewController.displayReviewList);

/* GET Route for the Add page 
   this will display the Add page */
router.get('/add', requireAuth, reviewController.displayAddPage);

/* POST Route for processing the Add page */
router.post('/add', requireAuth, reviewController.processAddPage);

/* GET request - display the Edit page */
router.get('/edit/:id', requireAuth, reviewController.displayEditPage);

/* POST request - Update the database with data from the Edit Page */
router.post('/edit/:id', requireAuth, reviewController.processEditPage);

/* GET request to perform the delete action */
router.get('/delete/:id', requireAuth, reviewController.performDelete);

module.exports = router;