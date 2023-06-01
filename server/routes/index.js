const router = require('express').Router();
const {
  getSingleUser,
  createUser,
  login,
  addJournal,
  removeJournal,
} = require('../../controllers/user-controller');

// run at /api/user
router.route('/')
  .post(createUser);

// run at /api/user/login
router.route('/login')
  .post(login);

// run at /api/user/:id or /api/user/me
router.route('/:id')
  .get(getSingleUser)
  .post(addJournal)     // Adds a journal to a user
  .delete(removeJournal); // Removes a journal from a user

module.exports = router;