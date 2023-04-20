const router = require("express").Router();
const {
    getThoughts,
    // getSingleThought,
    createThought,
  } = require('../../controllers/thoughtController');
  
  // /api/thought
  router.route('/').get(getThoughts).post(createThought);
  
  // /api/thought/:thoughtid
  // router.route('/:thoughtId').get(getSingleThought);


module.exports = router;