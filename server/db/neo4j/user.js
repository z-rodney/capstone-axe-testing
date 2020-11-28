const _ = require('lodash');
const apoc = require('apoc');
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

    return session.readTransaction((tx) =>
            tx.run("MATCH (user:User {sessionId: $sessionId}) \
                    RETURN user", { sessionId })
        )
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

// INPUT: username OUTPUT: user node
function getUser(username) {

    // Uses default neo4j database in neo4j desktop, which developers must run
    // Otherwise, create db in seed file or heroku config for db(?)

    // create a session to run cypher statements in
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    return session.readTransaction((tx) =>
            tx.run("MATCH (user:User {username: $username}) \
                    RETURN user", { username })
        )
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

// INPUT: user properties OUTPUT: newly created user node
function createUser(username, password) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    return session.writeTransaction((tx) =>
        tx.run("CREATE (user:User $props) RETURN user",
                {
                    "props": {
                        "username": username,
                        "password": password
                    }
                }
            )
        )
        .then(result => {
            if (_.isEmpty(result.records)) return null;
            const record = result.records[0];
            return new User(record.get('user'));
        })
        .catch(err => {
            throw err;
        })
        .finally(() => {
            return session.close();
        });
}

// INPUT: username OUTPUT: newly created session node
function createSession(username) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    return session.writeTransaction((tx) =>
        tx.run("MATCH (user:User { username: $username }) \
                CREATE (user)-[rel:HAS_SESSION]->(session:Session { sessionId: $sessionId }) \
                RETURN session",
            {
                username: username,
                sessionId: 123 //apoc.create.uuid()
            })
        )
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

module.exports = {
    getSession,
    getUser,
    createUser,
    createSession
}
