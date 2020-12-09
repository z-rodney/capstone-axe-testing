const searchUsers = require('./searchUsers')
const {getLocations, addLocation} = require('./location')
const {getFriends, addFriend} = require('./friends')
const {getContacts, addContact} = require('./contacts')
const {getPreferences, addPreferences} = require('./preferences')


module.exports = {
    getLocations,
    getFriends,
    getContacts,
    getPreferences,
    addPreferences,
    addLocation,
    addContact,
    addFriend,
    searchUsers
}
