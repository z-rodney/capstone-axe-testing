const driver = require('../db');

const addFriend = async({userName, friend}) => {
    let session = driver.session()

    try{
        user = await session.run(
            'Match (me:User {username: $userName }) \
            Match (friend:User {username: $friend}) \
            Create (me)-[r:FOLLOWS]->(friend) \
            Return me, friend', 
            {
            userName : userName,
            friend : friend,

        })
    
       return user
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = addFriend