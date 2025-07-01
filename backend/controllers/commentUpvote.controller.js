const Upvote = require('../models/comment_upvote.model')


//Revome comment Upvote
const  createUpvote = async(req,res) =>{
    const {id} = req.params;


    try{
        const remove = await Upvote.createUpvote({id});
    return res.status(200).json( {message: `Comment with Comment ID: ${id} succesfully upvoted.`});
    }catch(err){
    console.log("Error in creating Comment upvote", err);
    res.status(500).json({message:"Internal server error!!!"});
}

}

//Revome comment Upvote
const  removeUpvote = async(req,res) =>{
    const {id} = req.params;


    try{
        const remove = await Upvote.createUpvote({id});
    return res.status(200).json( {message: `Comment with Comment ID: ${id} succesfully upvoted.`});
    }catch(err){
    console.log("Error in creating Comment upvote", err);
    res.status(500).json({message:"Internal server error!!!"});
}

}

module.exports = {
    createUpvote,
    removeUpvote
}