const driver = require('../db');
const User = require('../models/User')

const getFriends = async({username}) => {
    let session = driver.session()

    //still need to exclude the password when returning user 
    try{
        const user = await session.run('MATCH (n:User {username: $username})<-[:FOLLOWS]-(User) RETURN User', {
            username : username
        })
        const record = user.records[0]
        return new User(record.get('User'))
      
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = getFriends