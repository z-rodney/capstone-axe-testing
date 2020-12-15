const _ = require('lodash');
const driver = require('../db');
const User = require('../models/User')

const getFriends = async (userId) => {
    let session = driver.session();

    try {
        const user = await session.run('MATCH (n:User {userId: $userId})-[:FOLLOWS]->(User) RETURN User', {
            userId
        });
        const record = user.records;
        const allFriends = [];
        for (let i = 0; i < record.length; i++) {
            const currentFriend = record[i];
            const friend = new User(currentFriend.get('User'));
            friend.password = '';
            allFriends.push(friend);
        }
        return allFriends;
    }
    catch (err) {
        console.log(err);
    } finally {
        await session.close();
    }
}

const addFriend = async (userId, friendId) => {
    const session = driver.session();
    try {
        const user = await session.run(
            `MATCH (me:User {userId: $userId })
            MATCH (friend:User {userId: $friendId})
            MERGE (me)-[r:FOLLOWS]->(friend)
            RETURN friend`,
            { userId, friendId }
        );
        const record = user.records[0];
        const newFriend = new User(record.get('friend'));
        newFriend.password = '';
        return newFriend;
    }
    catch (err) {
        console.log(err);
    } finally {
        await session.close();
    }
}

const searchUsers = async (searchTerm, userId) => {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });

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
                }));
      if (_.isEmpty(result.records)) {
        return null;
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
      await session.close();
    }
  }

module.exports = {
    getFriends,
    addFriend,
    searchUsers
}
