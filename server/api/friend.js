const express = require('express');
const friendRouter = express.Router();
const {
  getFriends,
  getLocations,
  getPreferences,
  getUserByUserId,
  getResults
} = require('../db/neo4j');

friendRouter.get('/:friendId', async (req, res, next) => {
  if (req.user) {
    try {
      const { friendId } = req.params;
      // Fill friend with all relevant details for a given friendId
      const [
        { name, userId, username },
        friendFriends,
        friendLocations,
        friendPrefs,
        friendResults
      ] = await Promise.all([
        getUserByUserId(friendId),
        getFriends(friendId),
        getLocations(friendId),
        getPreferences(friendId),
        getResults(friendId)
      ]);
      // Build profile object with the details from the db, if present
      const friendProfile = {
        name,
        username,
        friendId: userId,
        friends: friendFriends || [],
        locations: friendLocations || [],
        prefs: friendPrefs || {},
        results: friendResults || {}
      };
      res.send(friendProfile);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(404).send({ message: 'Unauthorized: User is not signed in.'});
  }
})

module.exports = friendRouter;
