const { Entry, Journal } = require('../models');

module.exports = {
  async createEntry({ params, body }, res) {
    const entry = await Entry.create(body);

    if (!entry) {
      return res.status(400).json({ message: 'Failed to create an entry!' });
    }

    await Journal.findByIdAndUpdate(params.journalId, { $push: { entries: entry._id } });

    res.json(entry);
  },

  async getEntry({ params }, res) {
    const entry = await Entry.findById(params.entryId);

    if (!entry) {
      return res.status(404).json({ message: 'Cannot find an entry with this id!' });
    }

    res.json(entry);
  },

  async updateEntry({ params, body }, res) {
    const updatedEntry = await Entry.findByIdAndUpdate(
      params.entryId,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Cannot find an entry with this id!' });
    }

    res.json(updatedEntry);
  },

  async deleteEntry({ params }, res) {
    const entry = await Entry.findByIdAndDelete(params.entryId);

    if (!entry) {
      return res.status(404).json({ message: 'Cannot find an entry with this id!' });
    }

    await Journal.findByIdAndUpdate(params.journalId, { $pull: { entries: entry._id } });

    res.json({ message: 'Entry deleted!' });
  },
};
