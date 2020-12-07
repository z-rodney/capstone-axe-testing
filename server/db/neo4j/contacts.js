const driver = require('../db');


const getContacts = async({userId}) => {
    let session = driver.session()
    //this function returns user and date contacted
    //still need to return it in a better way
    try {
        const user = await session.run('MATCH (n:User)-[r:CONTACTED]->(:User {userId: $userId}) RETURN r, n', {
            userId
        })
       return user.records
    }
    catch (err) {
        console.log(err)
    } finally {
        await session.close()
    }

}

const addContact = async({userId, contacted, date}) => {
    let session = driver.session()
    try {
        const user = await session.run(
           `MATCH (me:User {userId: $userId })
            MATCH (friend:User {userId: $contacted})
            CREATE (me)-[r:CONTACTED]->(friend)
            CREATE (friend)-[r2:CONTACTED]->(me)
            SET r.contactDate = $date
            SET r2.contactDate = $date
            RETURN me, friend`,
            { userId, contacted, date }
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
    getContacts,
    addContact
}
