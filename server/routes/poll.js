const controllers = require('../controllers');

const router = require('express').Router();
const auth = require('../middlewares/auth');

// show everything
router.route('/')
    .get(controllers.showPolls)
    .post(auth, controllers.createPolls);

router.get('/users',auth, controllers.userPolls);

router
    .route('/:id')
    .get( controllers.getPoll)
    .post(auth, controllers.vote)
    .delete(auth, controllers.deletePoll);

module.exports = router;