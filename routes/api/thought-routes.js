const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought, 
  } = require('../../controllers/thoughtController');
  
  // /api/thought
  router.route('/').get(getThoughts).post(createThought);
  
  // /api/thought/:thoughtid
  router.route('/:thoughtId').get(getSingleThought);
  router.route("/:thoughtId").get(getSingleThought).delete(deleteThought);


module.exports = router;