const _ = require('lodash');
const User = require('../models/User');
const driver = require('../db');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


/**
 * Returns the user node associated with the given username
 *
 * @param {*} username
 * @return {*}
 */
async function getUserByUsername(username) {
    // Create a session to run cypher statements in
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


/**
 * Returns the user node associated with the given userId
 *
 * @param {*} userId
 * @return {*}
 */
async function getUserByUserId(userId) {
    // Create a session to run cypher statements in
    const session = driver.session({ database: process.env.NEO4J_DATABASE });
    try {
        const result = await session.readTransaction((tx) => {
            return tx.run('MATCH (user:User {userId: $userId}) RETURN user', { userId });
        });
        if (_.isEmpty(result.records)) return null;
        const record = result.records[0];
        const user = new User(record.get('user'));
        user.password = ''; // Obscure password in return object
        return user
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        session.close();
    }
}


/**
 * Creates a new user node with the given properties
 *
 * @param {*} username
 * @param {*} password
 * @param {*} name
 * @return {*}
 */
async function createUser(username, password, name) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });
    try {
        const result = await session.writeTransaction((tx) => {
            return tx.run(`
                CREATE (user:User {username: $username,
                password: $password,
                name: $name, userId:
                apoc.create.uuid()})
                RETURN user`,
            {username, password, name});
        });
        if (_.isEmpty(result.records)) return null;
        const record = result.records[0];
        const newUser = new User(record.get('user'));
        newUser.password = ''; // Obscure password in return object
        return newUser;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        await session.close();
    }
}


/**
 * For the user node with the given userId, update with new data
 *
 * @param {*} userId
 * @param {*} data
 * @return {*}
 */
async function updateUser(userId, data) {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });
    try {
        const result = await session.writeTransaction((tx) => {
            return tx.run(`
                UNWIND $props AS map
                MATCH (user:User { userId: $userId })
                SET user += map`,
            {
                props: [ data ],
                userId
            });
        });
        if (_.isEmpty(result.records)) return null;
        const record = result.records[0];
        const newUser = new User(record.get('user'));
        newUser.password = ''; // Obscure password in return object
        return newUser;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
       await session.close();
    }
}

module.exports = {
    getUserByUsername,
    getUserByUserId,
    createUser,
    updateUser
};
