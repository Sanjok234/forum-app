const express = require ('express');
const router = express.Router();
const upvoteController = require('../controllers/forumUpvote.controller');
const {authorizeForumOwner, authenticateToken} = require('../middlewares/auth.middleware')

//Get upvote count
// router.get('/:id', upvoteController.getUpvoteCount);

//create upvote
router.post('/:forum_id',
    authenticateToken,
     upvoteController.createUpvote);

//remove upvote
router.delete('/:forum_id',
    authenticateToken,
    
    upvoteController.removeUpvote);

module.exports = router;