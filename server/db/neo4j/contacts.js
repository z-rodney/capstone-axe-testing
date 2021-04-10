const driver = require('../db');
const Contact = require('../models/Contact');


/**
 * Returns all contacts for a given user ID in an array
 *
 * @param {*} userId
 * @return {*} user's contacts
 */
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
            const currentContact = record[i];
            const contactDate = currentContact._fields[1];
            const contact = new Contact(currentContact.get('c'), contactDate); // Create contact object
            allContacts.push(contact);
        }
        return allContacts;
    } catch (err) {
        console.log(err);
    } finally {
        await session.close();
    }

}


/**
 * Adds given contact(s) for a userId on a given date. Query "unwinds" all contacts
 * add contact relationship for each. Relationship is bidirectional.
 *
 * @param {*} contacts
 * @param {*} date
 * @param {*} userId
 */
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
};
