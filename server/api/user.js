const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const { createUser, updateUser } = require('../db/neo4j/user');
const { createSession } = require('../db/neo4j/session');
const { postResults, getResults } = require('../db/neo4j/testResults');
const {
  getContacts,
  getFriends,
  getLocations,
  getPreferences,
  addFriend,
  addLocation,
  addContact,
  addPreferences,
  searchUsers
} = require('../db/neo4j');

const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

// POST /api/user
// Creates new user in db
userRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body;
  const hashedPW = await bcrypt.hash(password, 10);

  const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  try {
    // validate email address before createUser
    if (!username.match(mailFormat)) {
      res.status(400).send({
        message: 'Not a valid email address.'
      });
    } else {
      const newUser = await createUser(username, hashedPW, name);
      if (newUser) {
        const newSession = await createSession(username);
        res.cookie('sessionId', newSession.sessionId, {
          maxAge: A_WEEK_IN_SECONDS,
          path: '/',
        });

        res.status(201).send(newUser);
      } else {
        res.sendStatus(400);
      }
    }
  } catch (e) {
    //this checks the type of error coming from sequelize
    if (e.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
      res.status(400).send({
        message: 'This username is already taken.'
      })
    } else {
      res.status(500).send({
        message: 'Something went horribly wrong.'
      })
    }
  }
})

// PUT /api/user/:userId
// use for adding NEW properties to the user node
userRouter.put('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.user;
    const updatedUser = await updateUser(userId, req.body);
    res.status(200).send(updatedUser);
  }
  catch (err) {
    next(err);
  }
})

// GET /api/user/:userId/getFriends
// retrieves a user's friends from db
userRouter.get('/:userId/friends', async(req, res, next) => {
  try {
    const {userId} = req.user
    const result = await getFriends(userId)
    res.status(200).send(result)
  }
  catch (err) {
    next(err)
  }
})

// GET /api/user/:userId/getContacts
// retrieves a user's Contacts from db
userRouter.get('/:userId/contacts', async(req, res, next) => {
  try {
    // const {userId} = req.user
    const result = await getContacts(req.params.userId)
    res.status(200).send(result)
  }
  catch (err) {
    next(err)
  }
})

// GET /api/user/:userId/getLocations
// retrieves a user's Locations from db
userRouter.get('/:userId/locations', async(req, res, next) => {
  try {
    const {userId} = req.user
  const result = await getLocations(userId)
    res.status(200).send(result)
  }
  catch (err) {
    next(err)
  }
})

// GET /api/user/:userId/getPreferences
// retrieves a user's Preferences from db
userRouter.get('/:userId/preferences', async(req, res, next) => {
  try {
    const result = await getPreferences(req.params.userId);
    res.status(200).send(result);
  }
  catch (err) {
    next(err);
  }
})

// POST /api/user/:userId/addLocation
// adds a location to a user in db
userRouter.post('/:userId/location', async(req, res, next) => {
  try {
      const {userId} = req.user

    const insert = await addLocation(req.body.location, userId)
    res.status(201).send(insert)
  }
  catch (err) {
    next(err)
  }
})

// POST /api/user/:userId/addContact
// adds a Contact to a user in db
userRouter.post('/:userId/contact', async(req, res, next) => {
  try {
    const insert = await addContact(req.body)
    res.status(201).send(insert)
  }
  catch (err) {
    next(err)
  }
})

// POST /api/user/:userId/friend
// adds a friend to a user in db
userRouter.post('/:userId/friend', async(req, res, next) => {
  if (req.user) {
    try {
      const { friendId } = req.body;
      const newFriend = await addFriend(req.params.userId, friendId);
      res.status(201).send(newFriend);
    }
    catch (err) {
      next(err);
    }
  } else {
      res.status(404).send({ message: 'Unauthorized: User is not signed in.'});
  }
})

// POST /api/user/:userId/addPreferences
// adds preferences to a user in db
userRouter.post('/:userId/preferences', async(req, res, next) => {
  try {
    const {
      householdSize,
      indoorDining,
      outdoorDining,
      essentialWorker,
      immunocompromised,
      mask,
      pubTrans
    } = req.body;
    const data = {
      userId: req.user.userId,
      householdSize,
      indoorDining,
      outdoorDining,
      essentialWorker,
      immunocompromised,
      mask,
      pubTrans
    }
    const preferences = await addPreferences(data);
    res.status(201).send(preferences);
  }
  catch (err) {
    next(err);
  }
})

// POST /api/user/:userId/results
userRouter.get('/:userId/results', async (req, res, next) => {
  if (req.user) {
    try {
      const { userId } = req.user
      const allResults = await getResults(userId)
      res.send(allResults)
    } catch (err) {
      next(err)
    }
  } else {
    res.status(404).send({message: 'Unauthorized: User is not signed in.'})
  }
})

//POST /api/user/:userId/results
userRouter.post('/:userId/results', async (req, res, next) => {
  if (req.user) {
    try {
      const { userId } = req.user
      const { covidTest, testDate } = req.body
      const newResult = await postResults(userId, covidTest, testDate)
      res.status(201).send(newResult)
    } catch (err) {
      next(err)
    }
  } else {
    res.status(404).send({message: 'Unauthorized: User is not signed in.'})
  }
})

//POST /api/user/search
userRouter.post('/search', async (req, res, next) => {
  if (req.user) {
    try {
      const { userId } = req.user;
      const { searchTerm } = req.body;
      const searchResults = await searchUsers(searchTerm, userId);
      res.status(201).send(searchResults);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(404).send({ message: 'Unauthorized: User is not signed in.'});
  }
})


module.exports = userRouter;
