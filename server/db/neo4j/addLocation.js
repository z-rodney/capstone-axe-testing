const driver = require('../db');

const addLocation = async({latitude, longitude, username}) => {
    let session = driver.session()

    try{
        const location = await session.run('MATCH (u:User {username: $username}) MERGE (l:Location {latitude: $latitude, longitude: $longitude}) CREATE (u)-[v:VISITED]->(l) RETURN l', {
            username : username,
            latitude: latitude,
            longitude: longitude

        })
       
       return location
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = addLocation