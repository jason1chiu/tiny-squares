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
          .populate("entries");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    journals: async (parent, args, context) => {
      const userData = await User.findOne({ _id: context.user._id })
        .select("-__v -password")
        .populate("journals")
        .populate("entries");

      return userData.journals;
    },

    journal: async (parent, { id }, context) => {
      let results = await Journal.findById(id)
        .populate("entries")
        .populate("legends")
        .exec();

      return results;
    },
    legends: async (parent, { id }, context) => {
      try {
        let results = await Journal.findById(id)
          .populate("entries")
          .populate("legends");

        return results.legends;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch legends");
      }
    },
  },

  Mutation: {

    updateUserPremiumStatus: async (_, {  premium }, context) => {
      if(context.user) {
        const updatePremium = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { premium } },
          { new: true }
        );

        return updatePremium
      } else {
        throw new AuthenticationError("User not authenticated");
      }
    },

    
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

    updateUser: async (parent, { username, avatar }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { username: username, avatar: avatar } },
          { new: true }
        );

        return updatedUser;
      }
    },

    logout: async (parent, { email }) => {
      // expire token manually
      return { email };
    },

    addJournal: async (parent, { name, category, image }, context) => {
      if (context.user) {
        try {
          const journal = await Journal.create({ name, category, image });
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { journals: journal._id } },
            { new: true }
          ).populate("journals");

          console.log("updatedUser", updatedUser);

          return updatedUser;
        } catch (error) {
          // Log any errors
          console.log("Error in addJournal:", error);
        }
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },

    removeJournal: async (parent, { journalId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { journals: journalId } },
          { new: true }
        );

        let journal = await Journal.findById(journalId);
        await Promise.all(
          journal.legends.map((legend) => Legend.findByIdAndDelete(legend._id))
        );
        await Promise.all(
          journal.entries.map((entry) => Entry.findByIdAndDelete(entry._id))
        );
        await Journal.findByIdAndDelete(journalId);
        return "Journal Deleted";
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    createLegend: async (parent, { journalId, label, color }, context) => {
      const legend = await Legend.create({
        label,
        color,
        userId: context.user._id,
      });

      console.log({ legend });

      const updatedJournal = await Journal.findOneAndUpdate(
        { _id: journalId },
        { $addToSet: { legends: legend._id } },
        { new: true }
      ).populate("legends");

      console.log({ updatedJournal });

      return updatedJournal.legends;
    },

    updateLegend: async (
      parent,
      { journalId, legendId, label, color },
      context
    ) => {
      const updatedLegend = await Legend.findByIdAndUpdate(
        legendId,
        { label, color },
        { new: true }
      );

      if (!updatedLegend) {
        throw new Error("Failed to update legend");
      }

      return updatedLegend;
    },

    deleteLegend: async (parent, { journalId, legendId }, context) => {
      await Legend.findByIdAndDelete(legendId);
      let docs = await Entry.find({ legend: { _id: legendId } });
      await Promise.all(
        docs.map((entry) =>
          Promise.all([
            Journal.findOneAndUpdate(
              { _id: journalId },
              { $pull: { entries: entry._id } },
              { new: true }
            ),
            Entry.findByIdAndDelete(entry._id),
          ])
        )
      );
      const updatedJournal = await Journal.findOneAndUpdate(
        { _id: journalId },
        { $pull: { legends: legendId } },
        { new: true }
      );

      return updatedJournal;
    },

    addEntry: async (parent, { journalId, input }, context) => {
      const entry = await Entry.create({
        date: input.date,
        note: input.note,
        legend: input.legendId,
      });

      const updatedJournal = await Journal.findOneAndUpdate(
        { _id: journalId },
        { $addToSet: { entries: entry._id } },
        { new: true }
      )
        .populate("legends")
        .populate("entries");

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
