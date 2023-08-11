const router = require('express').Router();

const {
  createUser,
  getSingleUser,
  addJournal,
  removeJournal,
  login,
  getUserFriends,
  addRemoveFriend,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/')
  .post(createUser);

router.route('/login')
  .post(login);

router.route('/me')
  .get(authMiddleware, getSingleUser)
  .put(authMiddleware, updateUser)

router.route('/journals/:journalId')
  .put(authMiddleware, addJournal)
  .delete(authMiddleware, removeJournal);

// Friend routers
router.get(":/id/friends", getUserFriends);

router.patch("/:id/:friendId", addRemoveFriend)

module.exports = router;