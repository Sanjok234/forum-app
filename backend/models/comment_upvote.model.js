const db = require('../config/db.config');

const createUpvote = async ({comment_id, user_id})=>{

    const upvote = await db.query(
        "INSERT INTO comment_upvotes comment_id = ?, user_id = ?",
        [comment_id,user_id]
    );
    return upvote;

}

const removeUpvote = async ({comment_id, user_id}) =>{
    const removedUpvote = await db.query(
        "DELETE FROM comment_upvotes  WHERE comment_id = ?",
        [comment_id]
    );
    return removedUpvote;

}

module.exports = {
    createUpvote,
    removeUpvote
}