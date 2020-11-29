const driver = require('../db');


const getContacts = async({userName}) => {
    let session = driver.session()
    //this function returns user and date contacted
    //still need to return it in a better way
    try{
        user = await session.run('match (n:User)-[r:CONTACTED]->(:User {username: $userName}) return r, n' , {
            userName : userName
        })
       return user.records
    }
    catch(err) {
        console.log(err)
    }
    
}

module.exports = getContacts