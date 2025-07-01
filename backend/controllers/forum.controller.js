const Forum = require("../models/forum.model");
const Comment = require("../models/comment.model");

const authUser = async (user_id, id) => {
  //check if the user_id belongs to the forum
  try {
    const forum_DB = await Forum.getForumById(id);

    if (!forum_DB) {
      return { success: false, status: 404, message: "Forum Not Found" };
    }
    //Authorize User ID
    if (forum_DB.user_id != user_id) {
      return { success: false, status: 403, message: "Unauthoraized access" };
    }

    //if authorized then return TRUE
    return { success: true };
  } catch (err) {
    console.log("Error in auhtUser:", err);
    return { success: false, status: 500, message: "Internal server error" };
  }
};

const forumController = {
  //Get all the forms for guest user
  getForumsGuest: async (req, res) => {
    try {
      const forums = await Forum.getAllForums(null); // no user ID
      res.status(200).json(forums);
    } catch (error) {
      console.error("Error fetching guest forums:", error);
      res.status(500).json({ error: "Failed to fetch forums" });
    }
  },
  //Get all the forums
  getAllForums: async (req, res) => {
    const user_id = req.user.id;
    try {
      const forums = await Forum.getAllForums(user_id);
      res.status(201).json(forums);
      console.log(forums);
    } catch (err) {
      console.log("Error in getAllForums controllers:", err);
      res.status(500).json({ error: "error in fetching forums" });
    }
  },
  getUserForums: async (req, res) => {
    const { id } = req.params;
    try {
      const forums = await Forum.getUserForums(id);
      res.status(201).json(forums);
      console.log(forums);
    } catch (err) {
      console.log("Error in getUserForums controllers:", err);
      res.status(500).json({ error: "error in fetching User forums" });
    }
  },

  //Get forum by ID
  getForumById: async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    try {
      const forum = await Forum.getForumById(id,user_id);
      if (!forum) return res.status(404).json({ error: 'Forum not found' });
      res.status(200).json(forum);
    } catch (err) {
      console.log("Error in getForumById controllers:", err);
      res.status(500).json({ error: "error in fetching forum" });
    }
  },
  //Get forum by ID
  getForumUpvoteCount: async (req, res) => {
    const { id } = req.params;

    try {
      const forum = await Forum.getForumUpvoteCount(id);
      res.status(200).json(forum);
    } catch (err) {
      console.log("Error in getForumById controllers:", err);
      res.status(500).json({ error: "error in fetching forum" });
    }
  },
  //Create forum
  createForum: async (req, res) => {
    const user_id = req.user.id;
    const { title, content } = req.body;

    try {
      const forumId = await Forum.createForum({ user_id, title, content });
      res.status(201).json({ message: `New Forum Created.`, id: forumId });
    } catch (err) {
      console.log("Error in createForum controllers:", err);
      res.status(500).json({ error: "error in creating forum" });
    }
  },
  //Update forum
  updateForum: async (req, res) => {
    const user_id = req.user.id;
    const { title, content } = req.body;
    const { id } = req.params;

    //firt check values
    if (!id || !user_id || !title || !content) {
      return res.status(400).json("Error incomplete data to update Forum");
    }

    // //if the user_id belongs to the forum
    // forum_DB = await Forum.getForumById(id)
    // if (!forum_DB) {
    //   return res.status(404).json('Error: Forum not found');
    // }
    // console.log(forum_DB)

    // //check authorization
    // if(user_id != forum_DB.user_id){
    //     return res.status(400).json('Unauthorized access!!! you cannot update this blog')
    // }


    try {
      const updatedforum = await Forum.updateForum({
        id,
        user_id,
        title,
        content,
      });
      res
        .status(200)
        .json({ message: `Forum with ID ${id} updated successfully` });
    } catch (err) {
      console.log("Error in updateForum controllers:", err);
      res.status(500).json({ error: "error in updating forum" });
    }
  },

  //Delete Forum
  deleteForum: async (req, res) => {
    const user_id = req.user.id;
    const { id } = req.params;

    //firt check values
    if (!id || !user_id) {
      return res.status(400).json("Error incomplete data to update blog");
    }

    

    if (!auth.success) {
      return res.status(auth.status).json(auth.message);
    }

    try {
      //now delete the forum
      const deletedForum = await Forum.deleteForum({ id });
      return res.status(200).json({
        message: `Forum with ID ${id} deleted successfully`,
      });
    } catch (err) {
      console.log("Error in deleting Forum", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = forumController;
