const _ = require('lodash');
const User = require('../models/User');
const driver = require('../db');

// EXPRESS ROUTE WILL CALL THIS FUNCTION DIRECTLY
function getUser(username) {

    // Uses default neo4j database in neo4j desktop, which developers must run
    // Otherwise, create db in seed file or heroku config for db(?)

    // create a session to run cypher statements in
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

    return session.readTransaction((tx) =>
            tx.run("MATCH (user:User {username:$username}) \
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

module.exports = {
    getUser
}
