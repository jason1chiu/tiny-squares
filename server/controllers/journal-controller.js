const { Journal } = require('../models');

module.exports = {
  async createJournal({ body }, res) {
    const journal = await Journal.create(body);

    if (!journal) {
      return res.status(400).json({ message: 'Failed to create a journal!' });
    }

    res.json(journal);
  },

  async getJournal({ params }, res) {
    const journal = await Journal.findOne({ _id: params.id });

    if (!journal) {
      return res.status(404).json({ message: 'Cannot find a journal with this id!' });
    }

    res.json(journal);
  },

  async updateJournal({ params, body }, res) {
    const updatedJournal = await Journal.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    );

    if (!updatedJournal) {
      return res.status(404).json({ message: 'Cannot find a journal with this id!' });
    }

    res.json(updatedJournal);
  },

  async deleteJournal({ params }, res) {
    const journal = await Journal.findOneAndDelete({ _id: params.id });

    if (!journal) {
      return res.status(404).json({ message: 'Cannot find a journal with this id!' });
    }

    res.json({ message: 'Journal deleted!' });
  },
};