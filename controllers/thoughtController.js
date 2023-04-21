const { thought, user } = require("../models");
// const { db } = require("../models/thoughts");

const thoughtController = {

    //get all thoughts
    async getThoughts(req, res) {
        console.log(req.body)
        try {
            const dbThoughts = await thought.find();
            res.json(dbThoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const dbThoughts = await thought.create(req.body);
            console.log(req.body)
            const userInfo = await user.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughts._id } },
                { new: true }
            );

            if (!userInfo) {
                return res.status(404).json({
                    message: "thought created but no user found with that ID",
                })
            }

            res.json(dbThoughts);
        } catch (err) {
            res.status(500).json(err);

        }
    },

    async getSingleThought(req, res) {
        try {
            const dbThoughts = await thought.findById({ _id: req.params.thoughtId });
            res.json(dbThoughts)

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteThought(req, res) {
        try {
            const dbThoughts = await thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!dbThoughts) {
            return res.status(400).json({ message: "no user found with that ID"})
        }
              res.json(dbThoughts)
        } catch (err) {
            res.status(500).json(err)
        }
    }


};

module.exports = thoughtController
