const _ = require('lodash');
const User = require('../models/User');
const driver = require('../db');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// INPUT: username OUTPUT: user node
function getUserByUsername(username) {

    // Uses default neo4j database in neo4j desktop, which developers must run
    // Otherwise, create db in seed file or heroku config for db(?)

    // create a session to run cypher statements in
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    return session.readTransaction((tx) =>
            tx.run(`MATCH (user:User {username: $username})
                    RETURN user`, { username }))
        .then(result => {
            if (_.isEmpty(result.records)) return null;
            const record = result.records[0];
            return new User(record.get('user'));
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
function createUser(username, password, name) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });
    return session.writeTransaction((tx) =>
        tx.run(`CREATE (user:User {username: $username, password: $password, name: $name, userId: apoc.create.uuid()}) RETURN user`,
        {username, password, name}))
        .then(result => {
            if (_.isEmpty(result.records)) return null;
            const record = result.records[0];
            const newUser = new User(record.get('user'));
            newUser.password = '';
            return newUser;
        })
        .catch(err => {
            throw err;
        })
        .finally(() => {
            return session.close();
        });
}

// INPUT: userId & new data OUTPUT: updated user node
function updateUser(userId, data) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    return session.writeTransaction((tx) =>
        tx.run(`UNWIND $props AS map
                MATCH (user:User { userId: $userId })
                SET user += map`,
            {
                "props": [ data ],
                "userId": userId
            })
        )
        .then(result => {
            if (_.isEmpty(result.records)) return null;
            const record = result.records[0];
            const newUser = new User(record.get('user'));
            newUser.password = "";
            return newUser;
        })
        .catch(err => {
            throw err;
        })
        .finally(() => {
            return session.close();
        });
}

module.exports = {
    getUserByUsername,
    createUser,
    updateUser
}
