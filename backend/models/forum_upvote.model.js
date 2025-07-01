const db = require("../config/db.config");

const createUpvote = async ({ user_id, forum_id }) => {
  const upvote = await db.query(
    "INSERT INTO forum_upvotes (user_id, forum_id) VALUES (?,?)",
    [user_id, forum_id]
  );
  return upvote;
};

const removeUpvote = async ({ forum_id, user_id }) => {
  const remove = await db.query(
    "DELETE FROM forum_upvotes WHERE forum_id = ? AND user_id= ?",
    [forum_id, user_id]
  );
  return remove;
};

module.exports = {
  createUpvote,
  removeUpvote,
};
