const driver = require('../db');
const Preferences = require('../models/Preferences')

const addPreferences = async({userId, indoorDining, outdoorDining, pubTrans, householdSize, immunocompromised, essentialWorker}) => {
    let session = driver.session()
    try {
        const preferences = await session.run(
            `MATCH (u:User {userId: $userId})
            CREATE (p:Preferences {indoorDining: $indoorDining, outdoorDining: $outdoorDining,
            pubTrans: $pubTrans, householdSize: $householdSize,
            immunocompromised: $immunocompromised, essentialWorker: $essentialWorker})
            CREATE (u)-[:PREFERS]->(p)
            RETURN p`,
            {
            userId,
            indoorDining,
            outdoorDining,
            pubTrans,
            householdSize,
            immunocompromised,
            essentialWorker
            }
        )
        const record = preferences.records[0]
        return new Preferences(record.get('p'))
    }
    catch (err) {
        console.log(err)
    } finally {
        await session.close()
    }

}

module.exports = addPreferences

