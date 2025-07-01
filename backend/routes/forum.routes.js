const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forum.controller');
const { authorizeForumOwner, authenticateToken } = require('../middlewares/auth.middleware');
const commentController = require('../controllers/comment.controller');

// Public route for guests
router.get('/guest',
      forumController.getForumsGuest);

//Get all Forums
router.get('/',
     authenticateToken,
      forumController.getAllForums);

//Get Forum by ID
router.get('/:id',
     authenticateToken,
      forumController.getForumById);



//Create forum
router.post('/create',
     authenticateToken,
     forumController.createForum);

//Update forum
router.put('/:id',
    authenticateToken,
     authorizeForumOwner,
      forumController.updateForum);

//Delete forum
router.delete('/:id',
    authenticateToken,
     authorizeForumOwner,
      forumController.deleteForum);


//Get all comments by Forum ID
router.get('/:id/comments',
     commentController.getCommentsByForumId);

//Post comment in a Forum
router.post('/:id/comments',
    authenticateToken,
     commentController.createComment);

//Post comment reply by comment id ID
router.post('/:id/comments/:comment_id',
    authenticateToken,
     commentController.createCommentReply);

     


module.exports = router;