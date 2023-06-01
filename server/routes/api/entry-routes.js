const router = require('express').Router();
const {
  createEntry,
  getEntry,
  updateEntry,
  deleteEntry,
} = require('../../controllers/entry-controller');

// run at /api/entry
router.route('/')
  .post(createEntry);

// run at /api/entry/:id
router.route('/:id')
  .get(getEntry)
  .put(updateEntry)
  .delete(deleteEntry);

module.exports = router;