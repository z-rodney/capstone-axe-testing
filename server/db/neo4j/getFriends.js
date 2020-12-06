const driver = require('../db');
const User = require('../models/User')

const getFriends = async({userId}) => {
    let session = driver.session()

    //still need to exclude the password when returning user
    try {
        const user = await session.run('MATCH (n:User {userId: $userId})<-[:FOLLOWS]-(User) RETURN User', {
            userId
        })
        const record = user.records[0]
        return new User(record.get('User'))
    }
    catch (err) {
        console.log(err)
    } finally {
        await session.close()
    }
}

module.exports = getFriends
