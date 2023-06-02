const router = require('express').Router();

const userRoutes = require('./user-routes');
const journalRoutes = require('./journal-routes');
const entryRoutes = require('./entry-routes');
const statisticsRoutes = require('./statistics-routes');

router.use('/user', userRoutes);
router.use('/journal', journalRoutes);
router.use('/entry', entryRoutes);
router.use('/statistics', statisticsRoutes);

module.exports = router;