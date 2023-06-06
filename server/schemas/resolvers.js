const { User, Journal, Entry, Legend } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("journals")

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    journals: async (parent, args, context) => {
      return Journal.find({})
        .populate("entries");
    },
    journal: async (parent, { id }, context) => {
      let results = await Journal.findById(id)
        .populate("entries")
        .populate("legends");
        console.log(results);
        return results;
    },
    legends: async (parent, { id }, context) => {
      try {
        const user = await User.findById(id).populate("journals").populate("legends");
        console.log({user: user.journals[0]});
        return user.legends;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch legends");
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      let results = await User.create({ username, email, password })
        .then((user) => {
          const token = signToken(user);
          return { token, user };
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
      return results;
    },

    login: async (parent, { email, password }, context) => {
      let results = await User.findOne({ email })
        .then(async (user) => {
          if (!user) {
            console.log("Incorrect credentials");
            return null;
          }
          const correctPw = await user.isCorrectPassword(password);
          if (!correctPw) {
            console.log("Incorrect credentials");
            return null;
          }
          const token = signToken(user);
          return { token, user };
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
      return results;
    },

    updateUser: async (parent, { username }, context) => {
      // console.log(context);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { username: username } },
          { new: true }
        );

        return updatedUser;
      }
    },

    logout: async (parent, { email }) => {
      // expire token manually
      return { email };
    },

    addJournal: async (parent, { name, category }, context) => {
      if (context.user) {
        const journal = await Journal.create({ name, category });
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { journals: journal._id } },
          { new: true }
        )
          .populate("journals")

        console.log(updatedUser);
        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    removeJournal: async (parent, { journalId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { journals: journalId } },
          { new: true }
        );

        await Journal.findByIdAndDelete(journalId);

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    createLegend: async (parent, { journalId, label, color }, context) => {
      const legend = await Legend.create({ label, color });
      const updatedJournal = await Journal.findOneAndUpdate(
        { _id: journalId },
        { $addToSet: { legends: legend._id } },
        { new: true }
      )
      .populate("legends")

      return updatedJournal;
    },

    updateLegend: async (parent, { journalId, legendId, label, color }, context) => {
      const updatedLegend = await Legend.findByIdAndUpdate(
        legendId,
        { label, color },
        { new: true }
      );

      if (!updatedLegend) {
        throw new Error('Failed to update legend');
      }

      return updatedLegend
    },

    deleteLegend: async (parent, { journalId, legendId }, context) => {
      const updatedJournal = await Journal.findOneAndUpdate(
        { _id: journalId },
        { $pull: { legends: legendId } },
        { new: true }
      );

      await Legend.findByIdAndDelete(legendId);

      return updatedJournal;
    },

    addEntry: async (parent, { journalId, input }, context) => {
      const entry = await Entry.create(input);
      const updatedJournal = await Journal.findOneAndUpdate(
        { _id: journalId },
        { $addToSet: { entries: entry._id } },
        { new: true }
      );

      return updatedJournal;
    },

    removeEntry: async (parent, { journalId, entryId }, context) => {
      const updatedJournal = await Journal.findOneAndUpdate(
        { _id: journalId },
        { $pull: { entries: entryId } },
        { new: true }
      );

      await Entry.findByIdAndDelete(entryId);

      return updatedJournal;
    },
  },
};

module.exports = resolvers;
