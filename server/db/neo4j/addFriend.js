const driver = require('../db');

const addFriend = async({userId, friend}) => {
    let session = driver.session()
    try {
        const user = await session.run(
            `MATCH (me:User {userId: $userId })
            MATCH (friend:User {userId: $friend})
            CREATE (me)-[r:FOLLOWS]->(friend)
            RETURN me, friend`,
            { userId, friend }
        )
       return user
    }
    catch (err) {
        console.log(err)
    } finally {
        await session.close()
    }
}

module.exports = addFriend
