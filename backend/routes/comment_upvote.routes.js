const express = require ('express');
const router = express.Router();
const upvoteController = require('../controllers/commentUpvote.controller');
const {authorizeCommentOwner,authenticateToken} = require('../middlewares/auth.middleware')

//Get upvote count
// router.get('/:id', upvoteController.getUpvoteCount);

//create upvote
router.post('/create', upvoteController.createUpvote);

//removew upvote
router.post('/remove',
    authenticateToken,
    authorizeCommentOwner,
    upvoteController.removeUpvote);

module.exports = router;