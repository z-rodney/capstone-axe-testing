const express = require('express');
const friendRouter = express.Router();
const {
  getContacts,
  getFriends,
  getLocations,
  getPreferences,
  getUserByUserId,
  getResults
} = require('../db/neo4j');

friendRouter.get('/:friendId', async (req, res, next) => {
  if (req.user) {
    try {
      const { friendId } = req.params
      const [
        { name, userId, username },
        friendContacts,
        friendFriends,
        friendLocations,
        friendPrefs,
        friendResults
      ] = await Promise.all([
        getUserByUserId(friendId),
        getContacts(friendId),
        getFriends(friendId),
        getLocations(friendId),
        getPreferences(friendId),
        getResults(friendId)
      ])
      const friendProfile = {
        name,
        username,
        friendId: userId,
        contacts: friendContacts,
        friends: friendFriends,
        locations: friendLocations,
        prefs: friendPrefs,
        results: friendResults
      }
      res.send(friendProfile)
    } catch (err) {
      next(err)
    }
  } else {
    res.status(404).send({ message: 'Unauthorized: User is not signed in.'});
  }
})

module.exports = friendRouter
