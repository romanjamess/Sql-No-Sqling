const { user, thought } = require("../models");

const userController = {

  // Get all users
  async getUsers(req, res) {
    try {
      const dbUser = await user.find().populate("friends");
      res.json(dbUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const dbUser = await user.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!dbUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(dbUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update a user
  async updateUser(req, res) {
    const { username, email } = req.body
    try {
      const dbUser = await user.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: { username, email } },
        { new: true },
        );

        res.json(dbUser)
     
    } catch (err) {
      res.status(500).json(err);

    }
  },

  addFriend({ params }, res) {
    user.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(500).json({ message: "No user with this id" });
          return;
        }
        console.log( {friends: params.friendId}),
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },



  // async addFriend( { params }, res) {
  //   try {
  //     // Find the user to add the friend to
  //     const dbuser = await user.findOneAndUpdate(
  //       { _id: req.params.userId },
  //       { $addToSet: { friends: params.friendId } },
  //       { new: true, runValidators: true }
  //     );
  
  //     // If the user doesn't exist, return a 404 status with a message
  //     if (!dbuser) {
  //       return res.status(500).json({ message: 'User not found' });
  //     }
  //     res.json(dbuser);
  //   } catch (error) {
  //     // If an error occurs during the try block, send a 500 status with a message
  //     res.status(500).json({ message: 'Could not add friend' });
  //   }
  // },


  // create a new user
  async createUser(req, res) {
    try {
      const dbuser = await user.create(req.body);
      res.json(dbuser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const dbUser = await user.findOneAndDelete({ _id: req.params.userId });

      if (!dbUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController