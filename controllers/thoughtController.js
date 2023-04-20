 const {thought, user } = require("../models");
// const { db } = require("../models/thoughts");

 const thoughtController = {
 
    //get all thoughts
    async getThoughts (req, res) {
        console.log(req.body)
        try {
        const dbThoughts = await thought.find();
        res.json(dbThoughts);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    async createThought (req, res) {
        try {
        const dbThoughts = await thought.create(req.body); 
        console.log(req.body)
        
        res.json(dbThoughts);
        } catch(err) {
            res.status(500).json(err);

        }
    },




 };

 module.exports = thoughtController
