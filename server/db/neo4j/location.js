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
            resObj.dateVisited = new Location(currentLocation.get('v'))
            locations.push(resObj)
        }

        return locations
    }
    catch (err) {
        console.log(err)
    }
}

const addLocation = async({title, date, coordinates, placeName}, userId) => {
    let session = driver.session()
    try {
        const location = await session.run(
            'MATCH (u:User {userId: $userId}) \
         MERGE (l:Location {title: $title, placeName: $placeName, coordinates: $coordinates})\
          CREATE (u)-[v:VISITED]->(l) \
          SET v.VistedDate = $date \
           RETURN l, v',
        {title, date, coordinates, placeName, userId})
        const record = location.records
        const locations = []
        for (let i = 0; i < record.length; i++) {
            const currentLocation = record[i]
            const resObj = {}
            resObj.location = new Location(currentLocation.get('l'))
            resObj.dateVisited = new Location(currentLocation.get('v'))
            locations.push(resObj)
        }

        return locations
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