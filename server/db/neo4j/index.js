const {getLocations, addLocation} = require('./location');
const {getFriends, addFriend, searchUsers} = require('./friends');
const {getContacts, addContact} = require('./contacts');
const { getPreferences, addPreferences, updatePreferences } = require('./preferences');
const { getUserByUserId } = require('./user');
const { getResults } = require('./testResults');


module.exports = {
    getLocations,
    getFriends,
    getContacts,
    getPreferences,
    addPreferences,
    addLocation,
    addContact,
    addFriend,
    updatePreferences,
    searchUsers,
    getUserByUserId,
    getResults
};
