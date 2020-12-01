const router = require('express').Router()
// const neo4j = require('../db/neo4j/user')
const {getContacts, getFriends, getLocations, getPreferences, 
        addFriend, addLocation, addContact, addPreferences} = require('../db/neo4j')

router.get('/getFriends', async(req, res, next) => {
    try{
        const result = await getFriends(req.body)
        res.status(200).send(result)
    }
    catch(err) {
        next(err)
    }
})

router.get('/getContacts', async(req, res, next) => {
    try{
        const result = await getContacts(req.body)
        res.status(200).send(result)
    }
    catch(err) {
        next(err)
    }
})

router.get('/getLocations', async(req, res, next) => {
    try{
       const result = await getLocations(req.body)
        res.status(200).send(result)  
    }
    catch{
        next(err)
    }
})

router.get('/getPreferences', async(req, res, next) => {
    try{
        const result = await getPreferences(req.body)
        res.status(200).send(result)
    }
    catch{
        next(err)
    }
})

router.post('/addLocation', async(req, res, next) => {
    try{
        const insert = await addLocation(req.body)
        res.status(201).send(insert)
    }
    catch(err) {
        next(err)
    }
})

router.post('/addContact', async(req, res, next) => {
    try{
        const insert = await addContact(req.body)
        res.status(201).send(insert)  
    }
    catch(err) {
        next(err)
    }
  
})

router.post('/addFriend', async(req, res, next) => {
    try{
       const insert = await addFriend(req.body)
        res.status(201).send(insert) 
    }
    catch(err) {
        next(err)
    }
})

router.post('/addPreferences', async(req, res, next) => {
    try{
       const insert = await addPreferences(req.body)
        res.status(201).send(insert) 
    }
    catch(err) {
        next(err)
    }
})


module.exports = router