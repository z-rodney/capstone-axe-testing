const driver = require('../db');
const User = require('../models/User')
const Contact = require('../models/Contact')


const getContacts = async (userId) => {
    let session = driver.session();
    try {
        const user = await session.run(
            `MATCH (u:User {userId: $userId})
            MATCH (c:User)-[r:CONTACTED]->(u)
            RETURN c ,r.contactDate`, { userId }
        );
        const record = user.records;
        const allContacts = [];
        for (let i = 0; i < record.length; i++) {
            const currentContact = record[i]
            const contactDate = currentContact._fields[1]
            const contact = new Contact(currentContact.get('c'), contactDate)
            allContacts.push(contact)
            /* const resObj = {}
            const currentContact = record[i]
            const contact = new User(currentContact.get('c'))
            contact.password = ''
            resObj.contact = contact
            resObj.contactDate = currentContact._fields[1]
            allContacts.push(resObj) */
            /* const resObj = {};
            const currentContact = record[i];
            const contact = new User(currentContact.get('c'));
            contact.password = '';
            resObj.contact = contact;
            resObj.contactDate = currentContact._fields[1];
            allContacts.push(resObj); */
        }
        return allContacts;
    } catch (err) {
        console.log(err);
    } finally {
        await session.close();
    }

}

const addContact = async (contacts, date, userId) => {
    let session = driver.session();
    try {
        await session.run(
           `UNWIND $contacts AS contact
            MATCH (me:User {userId: $userId })
            MATCH (friend:User {userId: contact})
            CREATE (me)-[r1:CONTACTED { contactDate: date($date) }]->(friend)
            CREATE (friend)-[r2:CONTACTED { contactDate: date($date) }]->(me)
            RETURN r1`,
            { contacts, date, userId }
        );
    } catch (err) {
        console.log(err);
    } finally {
        await session.close();
    }
}


module.exports = {
    getContacts,
    addContact
}
