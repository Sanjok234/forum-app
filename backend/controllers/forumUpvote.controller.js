const Upvote = require("../models/forum_upvote.model");

//Revome comment Upvote
const createUpvote = async (req, res) => {
  const user_id = req.user.id;
  const { forum_id } = req.params; //forum id
  console.log(forum_id);

  try {
    const create = await Upvote.createUpvote({ user_id, forum_id });
    return res.status(200).json({
      message: `Forum with Forum ID: ${forum_id} succesfully upvoted.`,
    });
  } catch (err) {
    console.log("Error in creating Forum upvote", err);
    res.status(500).json({ message: "Internal server error!!!" });
  }
};

//Revome comment Upvote
const removeUpvote = async (req, res) => {
  const { forum_id } = req.params;
  const user_id = req.user.id;

  try {
    const remove = await Upvote.removeUpvote({ forum_id, user_id });
    return res
      .status(200)
      .json({
        message: `Forum with Forum ID: ${forum_id} succesfully upvoted.`,
      });
  } catch (err) {
    console.log("Error in creating Forum upvote", err);
    res.status(500).json({ message: "Internal server error!!!" });
  }
};

module.exports = {
  createUpvote,
  removeUpvote,
};
