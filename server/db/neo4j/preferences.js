const _ = require('lodash');
const driver = require('../db');
const Preferences = require('../models/Preferences');

const getPreferences = async (userId) => {
    let session = driver.session();
    try {
        const preferences = await session.run('MATCH (u:User {userId: $userId}) MATCH (p:Preferences)<-[:PREFERS]-(u) RETURN p', {
            userId
        })
        if (_.isEmpty(preferences.records)) return null
        const record = preferences.records[0];
        return new Preferences(record.get('p'));
    }
    catch (err) {
        console.log(err);
    } finally {
        await session.close();
    }
}


const addPreferences = async({ userId, householdSize, indoorDining, outdoorDining, essentialWorker, immunocompromised, mask, pubTrans }) => {
    let session = driver.session();

    try {
        const preferences = await session.run(
            // eslint-disable-next-line no-multi-str
            'MATCH (u:User {userId: $userId}) \
            CREATE (p:Preferences { \
                householdSize: $householdSize, \
                indoorDining: $indoorDining, \
                outdoorDining: $outdoorDining, \
                essentialWorker: $essentialWorker, \
                immunocompromised: $immunocompromised, \
                mask: $mask, \
                pubTrans: $pubTrans  \
             }) \
            MERGE (u)-[:PREFERS]->(p) \
            RETURN p',
            {
                userId,
                householdSize,
                indoorDining,
                outdoorDining,
                essentialWorker,
                immunocompromised,
                mask,
                pubTrans
            }
        );
        const record = preferences.records[0];
        return new Preferences(record.get('p'));
    } catch (err) {
        console.log(err);
    } finally {
        await session.close();
    }
}

const updatePreferences = async({ userId, householdSize, indoorDining, outdoorDining, essentialWorker, immunocompromised, mask, pubTrans }) => {
    let session = driver.session();

    try {
        const preferences = await session.run(
            `MERGE (u:User {userId: $userId}) -[:PREFERS]-> (p)
            SET p.householdSize = $householdSize,
                p.indoorDining = $indoorDining,
                p.outdoorDining = $outdoorDining,
                p.essentialWorker = $essentialWorker,
                p.immunocompromised = $immunocompromised,
                p.mask = $mask,
                p.pubTrans = $pubTrans
            RETURN p`,
            {
                userId,
                householdSize,
                indoorDining,
                outdoorDining,
                essentialWorker,
                immunocompromised,
                mask,
                pubTrans
            }
        );
        const record = preferences.records[0];
        return new Preferences(record.get('p'));
    } catch (err) {
        console.log(err);
    } finally {
        await session.close();
    }
}

module.exports = {
    addPreferences,
    getPreferences,
    updatePreferences
};
