const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought, 
    updateThought,
    addReaction,
    deleteReaction,
  } = require('../../controllers/thoughtController');
  
  // /api/thought
  router.route('/').get(getThoughts).post(createThought);
  
  // /api/thought/:thoughtid
  router.route('/:thoughtId').get(getSingleThought).put(updateThought);
  router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);
  router.route("/:thoughtId/reactions").post(addReaction);
  router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);


module.exports = router;