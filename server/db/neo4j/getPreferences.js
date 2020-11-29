const driver = require('../db');

const getPreferences= async({userName}) => {
    let session = driver.session()

    try{
        preferences = await session.run('Match (p:Preferences {belongsTo : $userName}) return p', {
            userName : userName
        })
        return preferences.records.map((preference) => {
            return preference._fields[0].properties
        })
   
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = getPreferences
