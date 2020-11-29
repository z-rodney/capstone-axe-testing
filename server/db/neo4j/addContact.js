const driver = require('../db');

const addlocation = async({userName, contacted, date}) => {
    let session = driver.session()

    try{
        user = await session.run(
            'Match (me:User {username: $userName }) \
            Match (friend:User {username: $contacted}) \
            Create (me)-[r:CONTACTED]->(friend) \
            Create (friend)-[r2:CONTACTED]->(me) \
            Set r.contactDate = $date \
            Set r2.contactDate = $date \
            Return me, friend', 
            {
            userName : userName,
            contacted : contacted,
            date : date

        })
        
       return user
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = addlocation