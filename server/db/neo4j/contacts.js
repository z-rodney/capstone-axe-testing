const driver = require('../db');
const User = require('../models/User')


const getContacts = async(userId) => {
    let session = driver.session()
    //this function returns user and date contacted
    //still need to return it in a better way
    try {
        const user = await session.run('MATCH (u:User {userId: $userId}) MATCH (c:User)-[r:CONTACTED]->(u) RETURN c ,r.contactDate', {
            userId
        })
        const record = user.records
        console.log(record)
        const allContacts = []
        for (let i = 0; i < record.length; i++) {
            const resObj = {}
            const currentContact = record[i]
            const contact = new User(currentContact.get('c'))
            contact.password = ''
            resObj.contact = contact
            resObj.contactDate = currentContact._fields[1]
            allContacts.push(resObj)
        }
        return allContacts
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
