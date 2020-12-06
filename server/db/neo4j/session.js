const _ = require('lodash');
const User = require('../models/User');
const Session = require('../models/Session');
const driver = require('../db');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// INPUT: cookie's sessionId OUTPUT: user node
async function getUserBySession(sessionId) {
  // create a session to run cypher statements in
  const session = driver.session({ database: process.env.NEO4J_DATABASE });

  try {
      const result = await session.readTransaction((tx) => {
        return tx.run('MATCH (:Session {sessionId: $sessionId})--(user:User) RETURN user', { sessionId });
      });
      if (_.isEmpty(result.records)) return null;
      const record = result.records[0];
      return new User(record.get('user'));
  } catch (err) {
      console.log(err);
      throw err;
  } finally {
      await session.close();
  }
}

// INPUT: username OUTPUT: newly created session node
async function createSession(username) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    try {
        const result = await session.writeTransaction((tx) => {
            return tx.run('MATCH (user:User { username: $username }) CREATE (user)-[rel:HAS_SESSION]->(session:Session { sessionId: apoc.create.uuid() }) RETURN session',
            { username: username });
        });
        if (_.isEmpty(result.records)) return null;
        const record = result.records[0];
        return new Session(record.get('session'));
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
       await session.close();
    }
}

// INPUT: sessionId
async function destroySession(sessionId) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    try {
        await session.writeTransaction((tx) => {
            return tx.run('MATCH (session:Session { sessionId: $sessionId }) DETACH DELETE session', { sessionId: sessionId })
        });
        console.log('Record deleted');
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        await session.close();
    }
}

module.exports = {
  getUserBySession,
  createSession,
  destroySession
}
