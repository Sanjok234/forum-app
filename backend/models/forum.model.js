const db = require("../config/db.config");

//Get all the forums
// const getAllForums = async () => {
//   const [rows] = await db.query("SELECT * FROM forums ORDER BY created_at DESC");
//   return rows;
// };

// const getAllForums = async () => {
//   const query = `
//     SELECT f.*, u.username AS author_name
//     FROM forums f
//     JOIN users u ON f.user_id = u.id
//     ORDER BY f.created_at DESC
//   `;
//   const [rows] = await db.query(query);
//   return rows;
// };

const getAllForums = async (user_id) => {
  const query = `
   SELECT 
      f.*, 
      u.username AS author_name,
      (
        SELECT COUNT(1)
        FROM forum_upvotes fu
        WHERE fu.forum_id = f.id AND fu.user_id = ?
      ) AS is_upvoted
    FROM forums f
    JOIN users u ON f.user_id = u.id
    ORDER BY f.created_at DESC
  `;
  const [rows] = await db.query(query, [user_id]);
  return rows;
};

const getUserForums = async (user_id) => {
  const query = `
    SELECT 
      f.*, 
      u.username AS author_name,
      (
        SELECT COUNT(1)
        FROM forum_upvotes fu
        WHERE fu.forum_id = f.id AND fu.user_id = ?
      ) AS is_upvoted
    FROM forums f
    JOIN users u ON f.user_id = u.id
    WHERE f.user_id = ?  -- filter forums posted by this user
    ORDER BY f.created_at DESC
  `;
  // Pass user_id twice: once for is_upvoted subquery, once for filtering
  const [rows] = await db.query(query, [user_id, user_id]);
  return rows;
};

//Get forum by ID
const getForumById = async (id, user_id) => {
  const query = `
    SELECT 
      f.*, 
      u.username AS author_name,
      (
        SELECT COUNT(1)
        FROM forum_upvotes fu
        WHERE fu.forum_id = f.id AND fu.user_id = ?
      ) AS is_upvoted
    FROM forums f
    JOIN users u ON f.user_id = u.id
    WHERE f.id = ?
  `;
  // Pass user_id for is_upvoted, and id for forum lookup
  const [rows] = await db.query(query, [user_id, id]);
  return rows[0];
};


//Get forum by ID
const getForumUpvoteCount = async (id) => {
  const [rows] = await db.query("SELECT * FROM forums WHERE id = ?", [id]);
  return rows[0].upvote_count;
};

//Get forum by ID
const getForumCommentCount = async (id) => {
  const [rows] = await db.query("SELECT * FROM forums WHERE id = ?", [id]);
  return rows[0].comment_count;
};

//Set forum  upvote count by ID
const updateForumUpvoteCount = async ({ id, upvote_count }) => {
  const updatedForum = await db.query(
    "UPDATE forums SET upvote_count = ? WHERE id = ?",
    [upvote_count, id]
  );
  return updatedForum;
};

//Set forum  upvote count by ID
const updateForumCommentCount = async ({ id, comment_count }) => {
  const updatedForum = await db.query(
    "UPDATE forums SET comment_count = ? WHERE id = ?",
    [comment_count, id]
  );
  return updatedForum;
};

//Create a new forum
const createForum = async ({ user_id, title, content }) => {
  const [result] = await db.query(
    "INSERT INTO forums (user_id, title, content) VALUES (?,?,?) ",
    [user_id, title, content]
  );
  
  return result.insertId;
};

//Create a new forum
const updateForum = async ({ id, user_id, title, content }) => {
  const updatedForum = await db.query(
    "UPDATE forums SET title = ?, content = ? WHERE id = ?",
    [title, content, id]
  );
  return updatedForum;
};

//delete Forum
const deleteForum = async ({ id }) => {
  const [deleteForum] = await db.query("DELETE FROM Forums WHERE id =?", [id]);
  return deleteForum;
};

module.exports = {
  getAllForums,
  getForumById,
  getForumCommentCount,
  getForumUpvoteCount,
  getUserForums,
  createForum,
  updateForum,
  updateForumCommentCount,
  updateForumUpvoteCount,
  deleteForum,
};
