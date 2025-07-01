const express = require("express");
const router = express.Router();
const commentController = require('../controllers/comment.controller')
const {authorizeCommentOwner,authenticateToken} = require('../middlewares/auth.middleware')

//Get all comments
router.get('/', commentController.getAllComments);



//Get commnet By ID
// router.get('/:id',commentController.getCommentById);


//Update comment
router.put('/update/:id',
    authenticateToken,
    authorizeCommentOwner,
    commentController.updateComment);

//Delele Comment
router.delete('/delete/:id',authenticateToken,
    authorizeCommentOwner,
    commentController.deleteComment);

module.exports = router;