const { Entry } = require('../models');

module.exports = {
  async getJournalStatistics({ params }, res) {
    // Assuming the Entry model has a category field that represents what the entry is about
    const entries = await Entry.find({ journal: params.journalId });

    if (!entries) {
      return res.status(404).json({ message: 'Cannot find entries for this journal!' });
    }

    const statistics = {};
    
    entries.forEach(entry => {
      if (statistics[entry.category]) {
        statistics[entry.category]++;
      } else {
        statistics[entry.category] = 1;
      }
    });

    res.json(statistics);
  },

  async getUserStatistics({ user }, res) {
    // Assuming the User model has a journals field that is an array of journal references
    // Also assuming each Journal has a 'category' field
    const journals = await Journal.find({ _id: { $in: user.journals }});

    if (!journals) {
      return res.status(404).json({ message: 'Cannot find journals for this user!' });
    }

    const statistics = {};

    journals.forEach(journal => {
      if (statistics[journal.category]) {
        statistics[journal.category]++;
      } else {
        statistics[journal.category] = 1;
      }
    });

    res.json(statistics);
  }
};