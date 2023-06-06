const router = require('express').Router();
const {
  createJournal,
  getJournal,
  updateJournal,
  deleteJournal,
} = require('../../controllers/journal-controller');

// run at /api/journal
router.route('/')
  .post(createJournal);

// run at /api/journal/:id
router.route('/:id')
  .get(getJournal)
  .put(updateJournal)
  .delete(deleteJournal);

module.exports = router;