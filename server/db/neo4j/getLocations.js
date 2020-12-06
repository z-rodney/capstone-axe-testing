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

module.exports = getLocations
