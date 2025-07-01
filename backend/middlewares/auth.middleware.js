const Forum = require("../models/forum.model")
const Comment = require ("../models/comment.model")
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET;

//check if the user is the owner of the forum
const authorizeForumOwner = async (req, res, next) =>{
    const {user_id} = req.body;// get user id
    const {id} = req.params.id; //get forum id

    try{
        const forum = await Forum.getForumById(id);
        if(!forum){
            res.status(404).json({message:"Forum not found"});
        }
        
        if(forum.user_id !== user_id){
            return res.status(403).json({message:"Unauthorized access to this forum"});
        }

        //if authorized then proceeed to next
        next();
    }
    catch(err){
        return res.status(500).json({message:"Server error in authroization"});
    }
};


//authorization  for comment
const authorizeCommentOwner = async (req,res,next) =>{
    const {user_id} = req.body; //get user id
    const {id} = req.params; //get comment id

    try{
        const comment = await Comment.getCommentById(id);

        if(!comment){
            return res.status(404).json({message:"Comment not found"});
        }

        if(comment.user_id !== parseInt(user_id)){

            return res.status(403).json({message:"Unauthorized access to this comment"});
        }

        //if authorized then proceed next
        next();

    }
    catch(err){
        console.log("Error when authorizing comment owner", err);
        return res.status(500).json({message:"Server error in authorization"});
    }
}


//authenticate Token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];//Expecting Beared token

    if(!token) return res.status(401).json({message:"Access denied. No token provided."});

    jwt.verify(token, JWT_SECRET, (err, user)=>{
        if(err) {
            console.log(err);
            return res.status(403).json({message:"Invalid or expired token."});
        }

        req.user = user; //user infor from token
        next();
    });
}


module.exports ={
    authorizeForumOwner,
    authorizeCommentOwner,
    authenticateToken
}