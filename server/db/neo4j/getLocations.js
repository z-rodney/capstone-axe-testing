const driver = require('../db');
const Location = require('../models/Location')


const getLocations = async({username}) => {
    let session = driver.session()
    try {
        const location = await session.run('MATCH (n:User {username: $username})-[v:VISITED]-(l:Location) RETURN l, v', {
            username: username
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
