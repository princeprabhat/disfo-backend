const Discussion = require("../Models/discussions.model").Discussion;
const Users = require("../Models/user.model").Users;

// const Users = require('../../../mern-2-takehomes/disfo-prince-prabhat/Models/user.model').Users
const discussionValidator = require("../validations/discussion.validator");

exports.createDiscussion = async (req, res) => {
  discussionValidator(req, res);
  const { title, author, content } = req.body;
  const user = await Users.findOne({ username: author });

 

  if (!user) {
    return res.status(404).json({ message: "user not found", author });
  } else {
    Discussion.create({
      title: title,
      author: author,
      content: content,
    })
      .then((newDiscussion) => {
        res.status(200).json(newDiscussion);
      })
      .catch((err) => {
        res.status(500).end();
      });
  }
};

exports.allDiscussions = (req, res) => {
  Discussion.find()
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ message: "No Discussions found" });
      } else {
        return res.status(200).json(data);
      }
    })
    .catch((err) => {
      return res.status(500).end();
    });
};

exports.usernameDiscussion = (req, res) => {
  const username = req.params.username;
  Discussion.find({ author: username })
    .then((discussion) => {
      if (!discussion || discussion.length === 0) {
        return res
          .status(404)
          .json({ message: "No discussions found for this user", username });
      } else {
        return res.status(200).json(discussion);
      }
    })
    .catch((err) => {
      return res.status(500).end();
    });
};

exports.discussionWithId = (req, res) => {
  const id = req.params.id;
  Discussion.findById(id)
    .then((discussion) => {
      if (!discussion) {
        return res
          .status(404)
          .json({
            message: "No discussions found with this id",
            discussionId: id,
          });
      } else {
        res.status(200).json(discussion);
      }
    })
    .catch((err) => {
      return res.status(500).end();
    });
};

exports.deleteDiscussion = async (req, res) => {
  const id = req.params.id;
  const author = req.body.author;

  const user = await Discussion.findById(id);

  if (!user) {
    return res.status(404).json({ message: "Discussion not found" });
  }
  if (user.author !== author) {
    return res.status(403).json({ message: "Unauthorized Access" });
  }

  Discussion.findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

exports.updateDiscussion = async (req, res) => {
  const id = req.params.id;
  const author = req.body.author;
  const updateDisc = req.body

  const user = await Discussion.findById(id);

  if (!updateDisc || Object.keys(updateDisc).length === 0) {
    return res.status(400).json({ message: "No updates provided in request body" });
  }

  if (!user) {
    return res.status(404).json({ message: "Discussion not found" });
  }
  if (user.author !== author) {
    return res.status(403).json({ message: "Unauthorized Access" });
  }

  Discussion.findByIdAndUpdate(id,updateDisc,{ new:true }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    res.status(500).json({ message: "Unable to verify author" });
  })

};

exports.updateComments = async(req,res) =>{
  const id = req.params.id;
  const author = req.body.author;
  

  const isAuthor = await Users.find({username:author})
  const discussion = await Discussion.findById(id)

  if (!isAuthor || isAuthor.length===0) {
    return res.status(404).json({ message: "user not found",author});
  }
  if (!discussion) {
    return res.status(404).json({ message: "discussion not found", discussionId: id });
  }

  Discussion.findByIdAndUpdate(id,{ $push: { comments: req.body } }, { new: true }).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    res.status(500).json({ message: err });
  })

  

}
