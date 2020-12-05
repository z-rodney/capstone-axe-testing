const driver = require('../db');

const addFriend = async({username, friend}) => {
    let session = driver.session()
    try {
        const user = await session.run(
            'MATCH (me:User {username: $username }) \
            MATCH (friend:User {username: $friend}) \
            CREATE (me)-[r:FOLLOWS]->(friend) \
            RETURN me, friend',
            {
            username: username,
            friend: friend,
            }
        )
       return user
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = addFriend
