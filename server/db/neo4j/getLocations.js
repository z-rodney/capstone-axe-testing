const driver = require('../db');


const getLocations = async({userName}) => {
    let session = driver.session()
    try{
        location = await session.run('match (n:User {username: $userName})-[v:VISITED]-(l:Location) Return l, v' , {
            userName : userName
        })
        return location.records.map((locations) => {
            return locations._fields[0]
        })
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = getLocations