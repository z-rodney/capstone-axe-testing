const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const { getUser } = require('../db/neo4j/user');
const { createSession, destroySession } = require('../db/neo4j/session');
const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

// GET /api/auth/whoami
authRouter.get('/whoami', (req, res, next) => {
  if (req.user) {
    res.send(req.user.username);
  } else {
    res.send('Not logged in.');
  }
})

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).send({
      message: 'Please enter a valid username and password.',
    });
  } else {
    try {
      const foundUser = await getUser(username);

      if (foundUser) {
        //if a user is found, check PW
        const comparisonResult = await bcrypt.compare(password, foundUser.password);
        if (!comparisonResult) {
          //if passwords don't match, send that error
          res.status(401).send({ message: 'Incorrect password.' });
        } else {
          // clear password
          foundUser.password = '';
          // create a new session for the user
          const createdSession = await createSession(username);

          res.cookie('sessionId', createdSession.sessionId, {
            maxAge: A_WEEK_IN_SECONDS,
            path: '/',
          });
          res.status(201).send(foundUser);
        }
      } else {
        //if a user isn't found, send such an error
        res.status(404).send({ message: 'User not found.' })
      }
    } catch (e) {
      console.error(e.message)
      res.status(500).send({
        message: e.message,
      })
    }
  }
})

// DELETE /api/auth/logout/:sessionId
authRouter.delete('/logout/:sessionId', async (req, res, next) => {
  try {
    await destroySession(req.params.sessionId);
    res.clearCookie('sessionId');
    req.user = null;
    res.status(205).send();
  } catch (e) {
    next(e);
  }
})

module.exports = authRouter;
