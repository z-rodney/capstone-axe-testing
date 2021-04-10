const _ = require('lodash');
const User = require('../models/User');
const Session = require('../models/Session');
const driver = require('../db');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


/**
 * Get the user node corresponding to the given sessionId
 *
 * @param {*} sessionId: belongs to current cookie
 * @return {*} user node associated with that session
 */
async function getUserBySession(sessionId) {
  // Create a session to run cypher statements in
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


/**
 * Creates a session node associated with the given username
 *
 * @param {*} username
 * @return {*} Newly created session node
 */
async function createSession(username) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    try {
        const result = await session.writeTransaction((tx) => {
            return tx.run(`
                MATCH (user:User { username: $username })
                CREATE (user)-[rel:HAS_SESSION]->(session:Session { sessionId: apoc.create.uuid() })
                RETURN session`, { username: username });
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


/**
 * Delete the session node with the given ID
 *
 * @param {*} sessionId
 */
async function destroySession(sessionId) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    try {
        await session.writeTransaction((tx) => {
            return tx.run(`
            MATCH (session:Session { sessionId: $sessionId })
            DETACH DELETE session`, { sessionId: sessionId })
        });
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
};
