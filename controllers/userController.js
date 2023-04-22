const { user, thought } = require("../models");

const userController = {

  // Get all users
  async getUsers(req, res) {
    try {
      const dbUser = await user.find().populate({
        path: "thoughts"
      });
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






  //  async updateUser (req, res) {
  //   try{
  //     // console.log(req);
  //     const dbUser = await user.findOneAndUpdate(
  //     {_id: req.params.userId },
  //     console.log( { _id: req.body.userId } ),
  //     {$set: {username , email }},
  //     {new: true},
  //       res.json(dbUser)
  //   )}catch(err){
  //        res.status(500).json( {message: "could not update user"})
  //   }
  //  },

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