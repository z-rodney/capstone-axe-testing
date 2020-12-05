const driver = require('../db');

const addContact = async({username, contacted, date}) => {
    let session = driver.session()

    try {
        const user = await session.run(
           'MATCH (me:User {username: $username }) \
            MATCH (friend:User {username: $contacted}) \
            CREATE (me)-[r:CONTACTED]->(friend) \
            CREATE (friend)-[r2:CONTACTED]->(me) \
            SET r.contactDate = $date \
            SET r2.contactDate = $date \
            RETURN me, friend',
            {
            username: username,
            contacted: contacted,
            date: date
            }
        )
       return user
    }
    catch (err) {
        console.log(err)
    }

}

module.exports = addContact
