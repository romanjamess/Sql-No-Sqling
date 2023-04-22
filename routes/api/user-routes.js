const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);
router.route("/:userId").put(updateUser);

module.exports = router;
