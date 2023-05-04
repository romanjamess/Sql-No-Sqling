const { thought, user } = require("../models");

const thoughtController = {

    //get all thoughts
    async getThoughts(req, res) {
        // console.log(req.body)
        try {
            const dbThoughts = await thought.find().populate({
                path: "reactions"
            });
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
            const dbThoughts = await thought.findOneAndRemove({ _id: req.params.thoughtId });
        if (!dbThoughts) {
            return res.status(400).json({ message: "no user found with that ID"})
        }
              res.json(dbThoughts)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async updateThought (req, res) {
        const { thoughtText, username } = req.body
        try {
          const dbThoughts = await thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: { thoughtText, username } },
            { new: true },
            );
    
            res.json(dbThoughts)
         
        } catch (err) {
          res.status(500).json(err);
    
        }
      },

      async addReaction ( req , res) {
        try{
            const dbThoughts = await thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                {$addToSet: { reactions: req.body }},
                {new: true},
            )
            res.json(dbThoughts)
        }catch(err){
                  res.status(500).json( {message: "could not add reaction"});
        }
      },
      async deleteReaction ( { params }, res) {
        try{
            const dbThoughts = await thought.findOneAndUpdate(
                { _id: params.thoughtId},
                {$pull : {reactions: { reactionId: params.reactionId}}},
                {new: true},
            )
            res.json(dbThoughts)
        }catch(err){
                  res.status(500).json( {message: "could not delete reaction"});
        }
      },


};

module.exports = thoughtController
