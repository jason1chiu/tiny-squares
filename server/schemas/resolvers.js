const { User, Journal, Entry} = require("../models");
const { Legend } = require("../models/Legend");
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
    journal: async (parent, { _id }, context) => {
      return Journal.findOne({ _id })
        .populate("entries");
    },
    legends: () => legend.find(),
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
        );

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

    createLegend: async(parent, { name, color }, context) => {
      const legend = await Legend.create({ name, color });
    
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { legends: legend._id } },
        { new: true }
      );
    
      return updatedUser;
    },
    
    updateLegend: async(parent, {id, name, color}) => {
      const legend = await Legend.findByIdAndUpdate(id, { name, color }, { new: true });
      return legend;
    },
    deleteLegend: async (_, { id }) => {
      await Legend.findByIdAndDelete(id);
      return true;
    },
  },
};

module.exports = resolvers;
