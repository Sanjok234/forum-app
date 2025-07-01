const db = require("../config/db.config");

//Get All the comments
const getAllComments = async () => {
  const [rows] = await db.query("SELECT * FROM comments");
  return rows;
};

//Get all the comments of a Forum
const getCommentsByForumId = async (forum_id) => {
  // const[rows] = await db.query(
  //     "SELECT * FROM comments WHERE forum_id = ? ",
  //     [forum_id]
  // );

  const [rows] = await db.query(
    `
    SELECT comments.*, users.username AS author
     FROM comments 
     INNER JOIN users ON comments.user_id = users.id 
     WHERE comments.forum_id = ? ORDER BY  comments.created_at DESC
  `,
    [forum_id]
  );
  // console.log(rows);

  return rows;
};

//Get commnet by Id
const getCommentById = async (id) => {
  const [rows] = await db.query("SELECT * FROM comments WHERE id = ? ", [id]);

  return rows[0];
};

// Create comment
const createComment = async ({
  forum_id,
  user_id,
  content,
  parent_comment_id,
}) => {
  const comment = await db.query(
    "INSERT INTO comments (forum_id, user_id, content, parent_comment_id) VALUES (?,?,?,?) ",
    [forum_id, user_id, content, parent_comment_id]
  );
  return comment;
};

//Update comment
const updateComment = async ({ id, content }) => {
  const update = await db.query(
    "UPDATE comments SET content = ? WHERE id = ?",
    [content, id]
  );
  console.log("comment succesffuly updated ", update);
  return update;
};

//Delete comment
const deleteComment = async ({ id }) => {
  const deletedComment = await db.query("DELETE FROM comments WHERE id = ?", [
    id,
  ]);
  console.log("comment succesffuly deleted ", deletedComment);
  return deletedComment;
};

module.exports = {
  getAllComments,
  getCommentsByForumId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
