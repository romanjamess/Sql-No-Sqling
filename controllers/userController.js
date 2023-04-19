const { user, thought } = require("../models");

const userController = {
    
        // Get all users
        async getUsers(req, res) {
          try {
            const dbUser = await user.find();
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
      
            await Application.deleteMany({ _id: { $in: user.applications } });
            res.json({ message: 'User and associated apps deleted!' })
          } catch (err) {
            res.status(500).json(err);
          }
        },
      };

 module.exports = userController