const router = require('express').Router();

const userRoutes = require('./user-routes');
const journalRoutes = require('./journal-routes');
const entryRoutes = require('./entry-routes');
const statisticsRoutes = require('./statistics-routes');
const storeRoutes = require('./store-routes')

router.use('/user', userRoutes);
router.use('/journal', journalRoutes);
router.use('/entry', entryRoutes);
router.use('/statistics', statisticsRoutes);
router.use('/store', storeRoutes)

module.exports = router;