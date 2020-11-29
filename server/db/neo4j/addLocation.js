const driver = require('../db');

const addlocation = async({latitude, longitude, userName}) => {
    let session = driver.session()

    try{
        user = await session.run('Create (n:Location {latitude: $latitude, longitude: $longitude})', {
            userName : userName,
            latitude: latitude,
            longitude: longitude

        })
       
       return user
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = addlocation