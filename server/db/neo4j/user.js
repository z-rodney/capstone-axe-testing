const _ = require('lodash');
const User = require('../models/User');
const driver = require('../db');

// Finds the user node for a given cookie sessionId
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

// EXPRESS ROUTE WILL CALL THIS FUNCTION DIRECTLY
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

function createUser(username, password) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    // include logic here or elsewhere that handles duplicate usernames?
    return session.writeTransaction((tx) =>
        tx.run("CREATE (user:User { username: $username, password: $password }) RETURN user",
            {
                username: username,
                password: password
            })
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

function createSession(username) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    return session.writeTransaction((tx) =>
        tx.run("MATCH user:User { username: $username } \
                CREATE session:Session { sessionId: apoc.create.uuid() } \
                CREATE (user)-[rel:HAS_SESSION]->(session) \
                RETURN session",
            {
                username: username,
            })
        )
        .then(result => {
            if (_.isEmpty(result.records)) return null;
            const record = result.records[0];
            return new User(record.get('session'));
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
