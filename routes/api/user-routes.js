const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);
router.route("/:userId").put(updateUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend)

module.exports = router;
