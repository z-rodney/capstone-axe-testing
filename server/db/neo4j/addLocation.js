const driver = require('../db');

const addLocation = async({latitude, longitude, userId}) => {
    let session = driver.session()
    try {
        const location = await session.run('MATCH (u:User {userId: $userId}) MERGE (l:Location {latitude: $latitude, longitude: $longitude}) CREATE (u)-[v:VISITED]->(l) RETURN l',
            { userId, latitude, longitude })
       return location
    }
    catch (err) {
        console.log(err)
    } finally {
        await session.close()
    }
}

module.exports = addLocation
