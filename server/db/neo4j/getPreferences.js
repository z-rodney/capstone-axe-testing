const driver = require('../db');
const Preferences = require('../models/Preferences')

const getPreferences = async({username}) => {
    let session = driver.session()

    try{
        const preferences = await session.run('MATCH (u:User {username: $username}) MATCH (p:Preferences)<-[:PREFERS]-(u) RETURN p', {
            username : username
        })
        const record = preferences.records[0]
        return new Preferences(record.get('p'))
   
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = getPreferences
