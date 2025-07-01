const Comment = require("../models/comment.model");

const commentController = {
  //Get all commnets
  getAllComments: async (req, res) => {
    try {
      const [rows] = await Comment.getAllComments();
      if (!rows) {
        return res.status(404).json({ message: "No comments found" });
      }
      return res.status(200).json(rows);
    } catch (err) {
      console.log("Error in getting all comments", err);
      res.status(500).json({ message: "Internal server error!!!" });
    }
  },
  //Get comments by Forum ID
  getCommentsByForumId: async (req, res) => {
    const { id } = req.params; //forum id

    try {
      const rows = await Comment.getCommentsByForumId(id);
      if (!rows) {
        return res
          .status(404)
          .json({ message: `No comments found for Forum ID: ${id}` });
      }
      // console.log(rows)
      return res.status(200).json(rows);
    } catch (err) {
      console.log("Error in getting comments by Forum ID", err);
      res.status(500).json({ message: "Internal server error!!!" });
    }
  },
  //Get comment by ID
  getCommentById: async (req, res) => {
    const { id } = req.params;

    try {
      const comment = await Comment.getCommentById(id);
      if (!comment)
        return res.status(404).jsons({ message: "Comment not found!!!" });

      return res.status(200).json(comment);
    } catch (err) {
      console.log("Error in getting comments by ID", err);
      res.status(500).json({ message: "Internal server error!!!" });
    }
  },
  //Create comment
  createComment: async (req, res) => {
    const user_id = req.user.id;
    const { content, parent_comment_id } = req.body;
    const { id } = req.params;
    const forum_id = id;

    if (!forum_id || !user_id || !content) {
      return res
        .status(404)
        .json({ message: "Please fill all the requied fields" });
    }
    if (parent_comment_id) {
      //check if comment id exist

      if (!(await Comment.getCommentById(parent_comment_id))) {
        return res.status(404).json({ error: "cannot find Parent comment ID" });
        console.log("Error parent comment ID not found");
      }
    }

    try {
      const comment = await Comment.createComment({
        forum_id,
        user_id,
        content,
        parent_comment_id,
      });
      return res
        .status(201)
        .json({ message: `Comment succesfully created. ID ${comment}` });
    } catch (err) {
      console.log("Error in creating Comment", err);
      res.status(500).json({ message: "Internal server error!!!" });
    }
  },
  //Create comment reply
  createCommentReply: async (req, res) => {
    const user_id = req.user.id;
    const { comment_id } = req.params;
    const { content } = req.body;
    const { id } = req.params;
    const forum_id = id;
    
    // console.log("comment_id"+ comment_id)
    // console.log(forum_id)

    if (!forum_id || !user_id || !content) {
      return res
        .status(404)
        .json({ message: "Please fill all the requied fields" });
    }
    if (comment_id) {
      //check if comment id exist

      if (!(await Comment.getCommentById(comment_id))) {
        return res.status(404).json({ error: "cannot find Parent comment ID" });
        console.log("Error parent comment ID not found");
      }
    }

    try {
      const parent_comment_id = comment_id;
      const comment = await Comment.createComment({
        forum_id,
        user_id,
        content,
        parent_comment_id,
      });
      return res
        .status(201)
        .json({ message: `Comment succesfully created. ID ${comment}` });
    } catch (err) {
      console.log("Error in creating Comment", err);
      res.status(500).json({ message: "Internal server error!!!" });
    }
  },
  //Update comment
  updateComment: async (req, res) => {
    const user_id = req.user.id;
    const { forum_id, content, parent_comment_id } = req.body;
    const { id } = req.params;

    //verify required fields
    if (!id || !user_id || !forum_id || !content) {
      return res
        .status(404)
        .json({ message: "Please fill the required input fields." });
    }

    try {
      const update = await Comment.updateComment({ id, content });
      return res.status(400).json({
        message: `Comment with Comment ID: ${id} succesfully updated`,
      });
    } catch (err) {
      console.log("Error in updating Comment", err);
      res.status(500).json({ message: "Internal server error!!!" });
    }
  },
  //Delete comment
  deleteComment: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedComment = await Comment.deleteComment({ id });
      return res.status(200).json({
        message: `Comment with Comment ID: ${id} succesfully deleted.`,
      });
    } catch (err) {
      console.log("Error in updating Comment", err);
      res.status(500).json({ message: "Internal server error!!!" });
    }
  },
};

module.exports = commentController;
