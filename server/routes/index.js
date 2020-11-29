const router = require('express').Router()
// const neo4j = require('../db/neo4j/user')
const {getContacts, getFriends, getLocations, getPreferences, 
        addFriend, addLocation, addContact} = require('../db/neo4j')

router.get('/getFriends', async(req, res, next) => {
    try{
        let result = await getFriends(req.body)
        res.status(200).send(result)
    }
    catch(err) {
        next(err)
    }
    
})

router.get('/getContacts', async(req, res, next) => {
    try{
        let result = await getContacts(req.body)
        res.status(200).send(result)
    }
    catch(err) {
        next(err)
    }
    
})

router.get('/getLocations', async(req, res, next) => {
    try{
       let result = await getLocations(req.body)
        res.status(200).send(result)  
    }
    catch{
        next(err)
    }
   
})

router.get('/getPreferences', async(req, res, next) => {
    try{
         let result = await getPreferences(req.body)
        res.status(200).send(result)
    }
    catch{
        next(err)
    }
   
})

router.post('/addLocation', async(req, res, next) => {
    console.log(req.body)
    try{
        let insert = await addLocation(req.body)
        res.send(insert)
    }
    catch(err) {
        next(err)
    }
    
})

router.post('/addContact', async(req, res, next) => {
    console.log(req.body)
    try{
        let insert = await addContact(req.body)
        res.send(insert)  
    }
    catch(err) {
        next(err)
    }
  
})

router.post('/addFriend', async(req, res, next) => {
    console.log(req.body)
    try{
       let insert = await addFriend(req.body)
        res.send(insert) 
    }
    catch(err) {
        next(err)
    }
    
})


module.exports = router