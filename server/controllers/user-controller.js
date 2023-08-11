const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    }).populate('journals');  // Populate the user's journals

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },

  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async addJournal({ user, params }, res) {  // Add a journal to a user's 'journals' field
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { journals: params.journalId } },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },

  async removeJournal({ user, params }, res) {  // Remove a journal from 'journals'
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { journals: params.journalId } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },

  async getUserFriends(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
  
      const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
      );
  
      const formattedFriends = friends.map(
        ({ _id, username, email, avatar, journals }) => {
          return { _id, username, email, avatar, journals }
        }
      )
  
      res.status(200).json(formattedFriends)
    } catch (err) {
      res.status(404).json({message: err.message})
    }
  },

  async addRemoveFriend(req, res) {
    try {
      const { id, friendId } = req.params;
      const user = await User.findById(id);
      const friend = await User.findById(friendId);

      if(user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id);
      } else {
        user.friends.push(friendId);
        friend.friends.push(id)
      }

      await user.save();
      await friend.save();

      const formattedFriends = friends.map(
        ({ _id, username, email, avatar, journals }) => {
          return { _id, username, email, avatar, journals }
        }
      )

      res.status(200).json(formattedFriends)
    } catch (err) {
      res.status(404).json({message: err.message})
    }
  }
};