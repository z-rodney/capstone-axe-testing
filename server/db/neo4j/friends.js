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
            friend.password = ''
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

const getAllFriendsEmails = async (userId) => {
    let session = driver.session()
    try {
        const user = await session.run('MATCH (user:User {userId: $userId})<-[:FOLLOWS]-(friend) RETURN friend.username', {
            userId
        })
        const record = user.records
        const allFriends = []
        for (let i = 0; i < record.length; i++) {
            const currentFriend = record[i]
            const friend = new User(currentFriend.get('User'))
            friend.password = ''
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

module.exports = {
    getFriends,
    addFriend
}
