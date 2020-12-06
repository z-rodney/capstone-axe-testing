const _ = require('lodash');
const User = require('../models/User');
const driver = require('../db');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// INPUT: username OUTPUT: user node
async function getUser(username) {
    // create a session to run cypher statements in
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    try {
        const result = await session.readTransaction((tx) => {
            return tx.run('MATCH (user:User {username: $username}) RETURN user', { username });
        });
        if (_.isEmpty(result.records)) return null;
        const record = result.records[0];
        return new User(record.get('user'));
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        session.close();
    }
}

// INPUT: user properties OUTPUT: newly created user node
async function createUser(username, password, name) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    try {
        const result = await session.writeTransaction((tx) => {
            return tx.run('CREATE (user:User {username: $username, password: $password, name: $name, userId: apoc.create.uuid()}) RETURN user',
                    {username, password, name});
        });
        if (_.isEmpty(result.records)) return null;
        const record = result.records[0];
        const newUser = new User(record.get('user'));
        newUser.password = '';
        return newUser;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        session.close();
    }
}

// INPUT: username & new data OUTPUT: updated user node
async function updateUser(username, data) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    try {
        const result = await session.writeTransaction((tx) => {
            return tx.run('UNWIND $props AS map MATCH (user:User { username: $username }) SET user += map',
            {
                props: [ data ],
                username
            });
        });
        if (_.isEmpty(result.records)) return null;
        const record = result.records[0];
        const newUser = new User(record.get('user'));
        newUser.password = '';
        return newUser;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        session.close();
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser
}
