const driver = require('../db');
const Location = require('../models/Location');
const User = require('../models/User');


const getLocations = async (userId) => {
    let session = driver.session();
    try {
        const location = await session.run(
            `MATCH (me:User {userId: $userId})-[v:VISITED]-(l:Location)
            RETURN l, v`, { userId }
        );
        const locRecord = location.records;
        const locations = [];
        for (let i = 0; i < locRecord.length; i++) {
            const currentLocation = locRecord[i];
            const resObj = {};
            resObj.location = new Location(currentLocation.get('l'));
            const { title, placeName } = resObj.location;
            resObj.dateVisited = currentLocation.get('v').properties.visitedDate;

            // get all contacts that visited location that are not the user
            const contact = await session.run(
                `MATCH (c:User)-[v:VISITED]-(l:Location {title: $title, placeName: $placeName})
                WHERE c.userId <> $userId
                RETURN c`, { title, placeName, userId }
            );
            const conRecord = contact.records;
            const contacts = [];
            for (let j = 0; j < conRecord.length; j++) {
                const newContact = new User(conRecord[j].get('c'));
                newContact.password = '';
                contacts.push(newContact);
            }
            resObj.contacts = contacts;
            locations.push(resObj);
        }
        return locations;
    }
    catch (err) {
        console.log(err);
    } finally {
        await session.close();
    }
}

const addLocation = async ({ title, date, coordinates, placeName, contacts }, userId) => {
    let session = driver.session();

    try {
        const location = await session.run(
            `UNWIND $contacts AS contact
            MATCH (c:User {userId: contact})
            MERGE (l:Location {title: $title, placeName: $placeName, coordinates: $coordinates})
            CREATE (c)-[v:VISITED]->(l)
            SET v.visitedDate = $date
            RETURN l, v`,
            { title, date, coordinates, placeName, contacts: [...contacts, userId] }
        );

        const currentLocation = location.records[0];
        const resObj = {};
        resObj.location = new Location(currentLocation.get('l'));
        resObj.dateVisited = currentLocation.get('v').properties.visitedDate;

        // get all contacts that visited location that are not the user
        const contact = await session.run(
            `UNWIND $contacts AS contact
            MATCH (c:User {userId: contact})
            RETURN c`, { contacts }
        );
        const conRecord = contact.records;
        const locContacts = [];
        for (let j = 0; j < conRecord.length; j++) {
            const newContact = new User(conRecord[j].get('c'));
            newContact.password = '';
            locContacts.push(newContact);
        }
        resObj.contacts = locContacts;

        return resObj;
    }
    catch (err) {
        console.log(err);
    } finally {
        await session.close();
    }
}

module.exports = {
    getLocations,
    addLocation
}
