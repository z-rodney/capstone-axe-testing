const driver = require('../db');
const Preferences = require('../models/Preferences');

const getPreferences = async({userId}) => {
    let session = driver.session()
    try {
        const preferences = await session.run('MATCH (u:User {userId: $userId}) MATCH (p:Preferences)<-[:PREFERS]-(u) RETURN p', {
            userId
        })
        const record = preferences.records[0]
        return new Preferences(record.get('p'))
    }
    catch (err) {
        console.log(err)
    } finally {
        await session.close()
    }
}

module.exports = getPreferences;
