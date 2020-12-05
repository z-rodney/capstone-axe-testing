const _ = require('lodash');
const User = require('../models/User');
const Session = require('../models/Session');
const driver = require('../db');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// INPUT: cookie's sessionId OUTPUT: user node
function getSession(sessionId) {
    // create a session to run cypher statements in
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    return session
    .readTransaction((tx) =>
        tx.run('MATCH (:Session {sessionId: $sessionId})--(user:User) RETURN user', { sessionId }))
    .then(result => {
        if (_.isEmpty(result.records)) return null;
        const record = result.records[0];
        return new User(record.get('user')); // return user node with properties
    })
    .catch(err => {
        throw err;
    })
    // close driver/network connections when application exits
    .finally(() => {
        return session.close();
    });
}

// INPUT: username OUTPUT: newly created session node
function createSession(username) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    return session
    .writeTransaction((tx) =>
        tx.run('MATCH (user:User { username: $username }) CREATE (user)-[rel:HAS_SESSION]->(session:Session { sessionId: apoc.create.uuid() }) RETURN session',
            { username: username }))
    .then(result => {
        if (_.isEmpty(result.records)) return null;
        const record = result.records[0];
        return new Session(record.get('session'));
    })
    .catch(err => {
        throw err;
    })
    .finally(() => {
        return session.close();
    });
}

// INPUT: sessionId
function destroySession(sessionId) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });
    return session
    .writeTransaction((tx) => {
        tx.run('MATCH (session:Session { sessionId: $sessionId }) DETACH DELETE session',
            { sessionId: sessionId })})
    .then(() => {
        console.log('Record deleted');
    })
    .catch(err => {
        throw err;
    })
    .finally(() => {
        return session.close();
    })
}

module.exports = {
  getSession,
  createSession,
  destroySession
}
