const router = require('express').Router();
const {
  getJournalStatistics,
  getUserStatistics,
} = require('../../controllers/statistics-controller');

// run at /api/statistics/journal/:id
router.route('/journal/:id')
  .get(getJournalStatistics);

// run at /api/statistics/user
router.route('/user')
  .get(getUserStatistics);

module.exports = router;