const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createthought,
  } = require('../../controllers/thoughtController');
  
  // /api/thought
  router.route('/').get(getThoughts).post(createthought);
  
  // /api/thought/:thoughtid
  router.route('/:thoughtId').get(getSingleThought);


module.exports = router;