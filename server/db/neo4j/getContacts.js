const driver = require('../db');


const getContacts = async({username}) => {
    let session = driver.session()
    //this function returns user and date contacted
    //still need to return it in a better way
    try{
        const user = await session.run('MATCH (n:User)-[r:CONTACTED]->(:User {username: $username}) RETURN r, n' , {
            username : username
        })
       return user.records
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = getContacts