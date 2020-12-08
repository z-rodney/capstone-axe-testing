const driver = require('../db');
const Location = require('../models/Location')


const getLocations = async({userId}) => {
    let session = driver.session()
    try {
        const location = await session.run('MATCH (n:User {userId: $userId})-[v:VISITED]-(l:Location) RETURN l, v', {
            userId
        })
        const record = location.records[0]
        console.log(location)
        const resObj = {}
        resObj.location = new Location(record.get('l'))
        resObj.dateVisited = new Location(record.get('v'))
        return resObj
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = getLocations
