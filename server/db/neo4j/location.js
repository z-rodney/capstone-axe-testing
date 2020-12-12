const driver = require('../db');
const Location = require('../models/Location')


const getLocations = async(userId) => {
    let session = driver.session()
    try {
        const location = await session.run('MATCH (n:User {userId: $userId})-[v:VISITED]-(l:Location) RETURN l, v', {
            userId
        })
        const record = location.records
        const locations = []
        for (let i = 0; i < record.length; i++) {
            const currentLocation = record[i]
            const resObj = {}
            resObj.location = new Location(currentLocation.get('l'))
            resObj.dateVisited = currentLocation.get('v').properties.visitedDate
            locations.push(resObj)
        }

        return locations
    }
    catch (err) {
        console.log(err)
    }
}

const addLocation = async ({ title, date, coordinates, placeName, contacts }, userId) => {
    let session = driver.session()

    // create relationship between location and each user with property of contact date

    try {
        const location = await session.run(
            `UNWIND $contacts AS contact
            MATCH (c:User {userId: contact})
            MERGE (l:Location {title: $title, placeName: $placeName, coordinates: $coordinates})
            CREATE (c)-[v:VISITED]->(l)
            SET v.visitedDate = $date
            RETURN l, v`,
            { title, date, coordinates, placeName, contacts: [...contacts, userId] }
        )
        const currentLocation = location.records[0]
        const resObj = {}
        resObj.location = new Location(currentLocation.get('l'))
        resObj.dateVisited = currentLocation.get('v').properties.visitedDate
        return resObj
    }
    catch (err) {
        console.log(err)
    } finally {
        await session.close()
    }
}

module.exports = {
    getLocations,
    addLocation
}
