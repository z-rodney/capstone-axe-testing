const driver = require('../db');
const User = require('../models/User')

const getFriends = async(userId) => {
    let session = driver.session()

    //still need to exclude the password when returning user
    try {
        const user = await session.run('MATCH (n:User {userId: $userId})<-[:FOLLOWS]-(User) RETURN User', {
            userId
        })
        const record = user.records
        const allFriends = []
        for (let i = 0; i < record.length; i++) {
            const currentFriend = record[i]
            const friend = new User(currentFriend.get('User'))
            allFriends.push(friend)
        }
        return allFriends
    }
    catch (err) {
        console.log(err)
    } finally {
        await session.close()
    }
}

module.exports = getFriends
