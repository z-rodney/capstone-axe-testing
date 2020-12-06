const driver = require('../db');


const getContacts = async({userId}) => {
    let session = driver.session()
    //this function returns user and date contacted
    //still need to return it in a better way
    try {
        const user = await session.run('MATCH (n:User)-[r:CONTACTED]->(:User {userId: $userId}) RETURN r, n', {
            userId
        })
       return user.records
    }
    catch (err) {
        console.log(err)
    } finally {
        await session.close()
    }

}

module.exports = getContacts
