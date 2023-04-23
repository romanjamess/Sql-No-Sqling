const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought, 
    updateThought,
    addReaction,
  } = require('../../controllers/thoughtController');
  
  // /api/thought
  router.route('/').get(getThoughts).post(createThought);
  
  // /api/thought/:thoughtid
  router.route('/:thoughtId').get(getSingleThought).put(updateThought);
  router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);
  router.route("/:thoughtId/reactions").post(addReaction);


module.exports = router;