const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const { createUser, updateUser } = require('../db/neo4j/user');
const { createSession } = require('../db/neo4j/session');
const {getContacts, getFriends, getLocations, getPreferences,
  addFriend, addLocation, addContact, addPreferences} = require('../db/neo4j')

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

// PUT /api/user
// use for adding NEW properties to the user node
userRouter.put('/', async (req, res, next) => {
  try {
    const { username } = req.user;
    const updatedUser = await updateUser(username, req.body);
    res.status(200).send(updatedUser);
  }
  catch (err) {
    next(err);
  }
})

// GET /api/getFriends
// retrieves a user's friends from db
userRouter.get('/getFriends', async(req, res, next) => {
  try {
    const result = await getFriends(req.body)
    res.status(200).send(result)
  }
  catch (err) {
    next(err)
  }
})

// GET /api/getContacts
// retrieves a user's Contacts from db
userRouter.get('/getContacts', async(req, res, next) => {
  try {
    const result = await getContacts(req.body)
    res.status(200).send(result)
  }
  catch (err) {
    next(err)
  }
})

// GET /api/getLocations
// retrieves a user's Locations from db
userRouter.get('/getLocations', async(req, res, next) => {
  try {
  const result = await getLocations(req.body)
    res.status(200).send(result)
  }
  catch (err) {
    next(err)
  }
})

// GET /api/getPreferences
// retrieves a user's Preferences from db
userRouter.get('/getPreferences', async(req, res, next) => {
  try {
    const result = await getPreferences(req.body)
    res.status(200).send(result)
  }
  catch (err) {
    next(err)
  }
})

// POST /api/addLocation
// adds a location to a user in db
userRouter.post('/addLocation', async(req, res, next) => {
  try {
    const insert = await addLocation(req.body)
    res.status(201).send(insert)
  }
  catch (err) {
    next(err)
  }
})

// POST /api/addContact
// adds a Contact to a user in db
userRouter.post('/addContact', async(req, res, next) => {
  try {
    const insert = await addContact(req.body)
    res.status(201).send(insert)
  }
  catch (err) {
    next(err)
  }
})

// POST /api/addFriend
// adds a friend to a user in db
userRouter.post('/addFriend', async(req, res, next) => {
  try {
  const insert = await addFriend(req.body)
    res.status(201).send(insert)
  }
  catch (err) {
    next(err)
  }
})

// POST /api/addPreferences
// adds preferences to a user in db
userRouter.post('/addPreferences', async(req, res, next) => {
  try {
  const insert = await addPreferences(req.body)
    res.status(201).send(insert)
  }
  catch (err) {
    next(err)
  }
})


module.exports = userRouter;
