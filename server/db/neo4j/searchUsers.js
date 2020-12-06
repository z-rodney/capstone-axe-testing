const _ = require('lodash');
const User = require('../models/User');
const driver = require('../db');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

async function searchUsers(searchTerm, userId) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE });

  // search for search term against user's name or username
  // filter out if result is the user themselves or in the user's friend list already
  // return as an array of User nodes

  try {
    const result = await session.readTransaction(tx =>
      tx.run(`MATCH (u:User {userId: $userId})
              MATCH (r:User)
              WHERE (r.name =~ $searchTerm OR r.username =~ $searchTerm)
              AND r.userId <> $userId
              AND NOT (r)<-[:FOLLOWS]-(u)
              RETURN r`, {
                searchTerm: `.*(?i)${searchTerm}.*`,
                userId
              }))
    if (_.isEmpty(result.records)) {
      return null
    }
    const { records } = result;
    const searchResults = [];
    records.forEach(user => {
      const newUser = new User(user.get('r'));
      newUser.password = '';
      searchResults.push(newUser);
    })
    return searchResults;
  } catch (err) {
    console.log(err);
  } finally {
    session.close();
  }
}

module.exports = searchUsers;
