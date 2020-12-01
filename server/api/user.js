const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const { createUser, updateUser } = require('../db/neo4j/user');
const { createSession } = require('../db/neo4j/session');

const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

// POST /api/user
// Creates new user in db
userRouter.post('/', async (req, res) => {
  const { username, password } = req.body;
  const hashedPW = await bcrypt.hash(password, 10);

  const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  try {
    // validate email address before createUser
    if (!username.match(mailFormat)) {
      res.status(400).send({
        unError: 'Not a valid email address.'
      });
    } else {
      const newUser = await createUser(username, hashedPW);
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
    if(e.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
      res.status(400).send({
        unError: 'This username is already taken.'
      })
    } else {
      res.status(500).send({
        unError: null,
        pwError: 'Something went horribly wrong.'
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
  catch(err) {
    next(err);
  }
})

module.exports = userRouter;
