const driver = require('../db');
const User = require('../models/User')

const getFriends = async(username) => {
    let session = driver.session()

    //still need to exclude the password when returning user
    try {
        const user = await session.run('MATCH (n:User {username: $username})<-[:FOLLOWS]-(u:User) RETURN u', {
            username: username
        })
        const record = user.records
        const allFriends = []
        for (let i = 0; i < record.length; i++) {
            const currentFriend = record[i]
            const friend = new User(currentFriend.get('u'))
            allFriends.push(friend)
        }
        return allFriends
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = getFriends
