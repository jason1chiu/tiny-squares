const router = require('express').Router();

const {
  createUser,
  getSingleUser,
  addJournal,
  removeJournal,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');
const upload = require('../../utils/uploadMiddleware');
// put authMiddleware anywhere we need to send a token for verification of user
router.route('/')
  .post(createUser);

router.route('/login')
  .post(login);

router.route('/me')
  .get(authMiddleware, getSingleUser);
  .put(authMiddleware, updateUser);

router.route('/journals/:journalId')
  .put(authMiddleware, addJournal)
  .delete(authMiddleware, removeJournal);

  router.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
    try {
      return res.status(201).json({ message: "File Uploaded Successfully", file: req.file });
    } catch (error) {
      console.error(error);
    }
  });

module.exports = router;