const driver = require('../db');

const getFriends = async({userName}) => {
    let session = driver.session()
    let user = "No user was created"

    //still need to exclude the password when returning user 
    try{
        user = await session.run('MATCH (n:User {username: $userName})<-[:FOLLOWS]-(User) return User', {
            userName : userName
        })
        return user.records.map((friends) => {
            return friends._fields[0].properties
        })
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = getFriends