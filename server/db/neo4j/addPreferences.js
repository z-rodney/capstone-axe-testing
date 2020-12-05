const driver = require('../db');
const Preferences = require('../models/Preferences');

const addPreferences = async({ userId, householdSize, indoorDining, outdoorDining, essentialWorker, immunocompromised, mask, pubTrans }) => {
    let session = driver.session();

    try {
        const preferences = await session.run(
            // eslint-disable-next-line no-multi-str
            'MATCH (u:User {userId: $userId}) \
            CREATE (p:Preferences { \
                householdSize: $householdSize, \
                indoorDining: $indoorDining, \
                outdoorDining: $outdoorDining, \
                essentialWorker: $essentialWorker, \
                immunocompromised: $immunocompromised, \
                mask: $mask, \
                pubTrans: $pubTrans  \
             }) \
            CREATE (u)-[:PREFERS]->(p) \
            RETURN p',
            {
                userId,
                householdSize,
                indoorDining,
                outdoorDining,
                essentialWorker,
                immunocompromised,
                mask,
                pubTrans
            }
        );
        const record = preferences.records[0];
        return new Preferences(record.get('p'));
    } catch (err) {
        console.log(err);
    }
}

module.exports = addPreferences;

