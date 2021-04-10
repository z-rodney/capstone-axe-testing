const driver = require('../db');
const Location = require('../models/Location');
const User = require('../models/User');


/**
 * Returns all the locations that a given userId has visited. Relationship direction
 * not applicable.
 *
 * @param {*} userId
 * @return {*}
 */
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
            resObj.dateVisited = currentLocation.get('v').properties.visitedDate;
            const { locationId } = resObj.location;

            // get all contacts that visited location that are not the user
            const contact = await session.run(
                `MATCH (c:User)-[v:VISITED]-(l:Location {locationId: $locationId})
                WHERE c.userId <> $userId
                RETURN c`, { userId, locationId }
            );
            const conRecord = contact.records;
            const contacts = [];
            for (let j = 0; j < conRecord.length; j++) {
                const newContact = new User(conRecord[j].get('c'));
                newContact.password = ''; // blind the passwords
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


/**
 * Add a location node with the given properties, create relationship between
 * given user and the newly created location node
 *
 * @param {*} { title, date, coordinates, placeName, contacts, covidData: {caseDensity, testPositivityRatio} }
 * @param {*} userId
 * @return {*}
 */
const addLocation = async ({ title, date, coordinates, placeName, contacts, covidData: {caseDensity, testPositivityRatio} }, userId) => {
    let session = driver.session();
    try {
        const location = await session.run(
            `UNWIND $contacts AS contactId
            MATCH (c:User {userId: contactId})
            MERGE (l:Location {
                title: $title,
                placeName: $placeName,
                coordinates: $coordinates,
                caseDensity: $caseDensity,
                testPosRatio: $testPositivityRatio})
            ON CREATE SET l.locationId = apoc.create.uuid()
            CREATE (c)-[v:VISITED]->(l)
            SET v.visitedDate = $date
            RETURN l, v`,
            { title, date, coordinates, placeName, caseDensity, testPositivityRatio, contacts: [...contacts, userId] }
        );

        const currentLocation = location.records[0];
        const resObj = {};
        resObj.location = new Location(currentLocation.get('l'));
        resObj.dateVisited = currentLocation.get('v').properties.visitedDate;

        // get all contacts that visited location that are not the user
        const contact = await session.run(
            `UNWIND $contacts AS contactId
            MATCH (c:User {userId: contactId})
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
};
