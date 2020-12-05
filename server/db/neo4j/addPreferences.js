const driver = require('../db');
const Preferences = require('../models/Preferences')

const addPreferences= async({username, indoorDining, outdoorDining, pubTrans, householdSize, immunocompromised, essentialWorker}) => {
    let session = driver.session()

    try{
        const preferences = await session.run(
            'MATCH (u:User {username: $username}) \
            CREATE (p:Preferences {indoorDining: $indoorDining, outdoorDining: $outdoorDining, \
            pubTrans: $pubTrans, householdSize: $householdSize, \
            immunocompromised: $immunocompromised, essentialWorker: $essentialWorker}) \
            CREATE (u)-[:PREFERS]->(p) \
            RETURN p', 
            {
            username : username,
            indoorDining: indoorDining,
            outdoorDining: outdoorDining,
            pubTrans: pubTrans,
            householdSize: householdSize,
            immunocompromised: immunocompromised,
            essentialWorker: essentialWorker

        })
        const record = preferences.records[0]
        return new Preferences(record.get('p'))
   
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = addPreferences

