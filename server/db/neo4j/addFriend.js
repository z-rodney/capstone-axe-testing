const User = require('../models/User');
const driver = require('../db');

const addFriend = async (userId, friendId) => {
    const session = driver.session();
    try {
        const user = await session.run(
            `MATCH (me:User {userId: $userId })
            MATCH (friend:User {userId: $friendId})
            CREATE (me)-[r:FOLLOWS]->(friend)
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

module.exports = addFriend;
