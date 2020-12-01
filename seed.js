const bcrypt = require('bcrypt');
const driver = require('./server/db/db');
const { NEO4J_DATABASE } = require('./constants');


const seed = async (db) => {
    console.log('in seed')

    let today = new Date()
    today = today.toString();

    const hashedPW = await bcrypt.hash('test', 10);

    try {
        // create database session
        const session = db.session({ database: NEO4J_DATABASE });

        // drop existing db records (similar to force: true in sequelize)
        await session.run('MATCH (n) DETACH DELETE n');

          

        // create 4 new users
        await session.run(
            'UNWIND $props AS map \
            CREATE (u:User) \
            SET u = map',
            {
                "props": [{
                    "username": "zoe",
                    "password": hashedPW,
                    "householdSize": 2,
                    "covidPosContact": false,
                    "covidTest": "negative",
                    "testDate": "2020-11-23"
                }, {
                    "username": "zaina",
                    "password": hashedPW,
                    "householdSize": 4,
                    "covidPosContact": false
                }, {
                    "username": "rehab",
                    "password": hashedPW,
                    "householdSize": 3,
                    "covidPosContact": false,
                    "covidTest": "negative",
                    "testDate": "2020-11-02"
                }, {
                    "username": "ranffi",
                    "password": hashedPW,
                    "householdSize": 2,
                    "covidPosContact": false,
                    "covidTest": "negative",
                    "testDate": "2020-11-01"
                }]
            }
        );

        // create preferences
        await session.run(
            'UNWIND $props AS map \
            CREATE (p: Preferences) \
            SET p = map',
            {
                "props": [{
                    "mask": true,
                    "indoorDining": false,
                    "outdoorDining": true,
                    "pubTrans": true,
                    "householdSize": 3,
                    "immunocompromised": false,
                    "essentialWorker": false
                }, {
                    "mask": true,
                    "indoorDining": true,
                    "outdoorDining": false,
                    "pubTrans": false,
                    "householdSize": 2,
                    "immunocompromised": false,
                    "essentialWorker": false
                }, {
                    "mask": true,
                    "indoorDining": false,
                    "outdoorDining": true,
                    "pubTrans": false,
                    "householdSize": 5,
                    "immunocompromised": false,
                    "essentialWorker": true
                }, {
                    "mask": true,
                    "indoorDining": false,
                    "outdoorDining": true,
                    "pubTrans": false,
                    "householdSize": 6,
                    "immunocompromised": false,
                    "essentialWorker": false
                }]
            }
        );

             //create user/preference relationship
             await session.run(
                'MATCH (zoe:User {username:$zoe}) \
                MATCH (zaina:User {username:$zaina}) \
                MATCH (ranffi:User {username:$ranffi}) \
                MATCH (rehab:User {username:$rehab}) \
                MATCH (p1:Preferences) WHERE p1.householdSize = 3 \
                MATCH (p2:Preferences) WHERE p2.householdSize = 2 \
                MATCH (p3:Preferences) WHERE p3.householdSize = 5 \
                MATCH (p4:Preferences) WHERE p4.householdSize = 6  \
                CREATE (zoe)-[rel1:PREFERS]->(p1) \
                CREATE (zaina)-[rel2:PREFERS]->(p2) \
                CREATE (ranffi)-[rel3:PREFERS]->(p3) \
                CREATE (rehab)-[rel4:PREFERS]->(p4)',
                {
                    zoe: 'zoe',
                    zaina: 'zaina',
                    ranffi: 'ranffi',
                    rehab: 'rehab'
                }
            );

        // create friend/follow relationship
        await session.run(
            'MATCH (zoe:User {username:$zoe}) \
            MATCH (zaina:User {username:$zaina}) \
            MATCH (ranffi:User {username:$ranffi}) \
            CREATE (zoe)-[rel:FOLLOWS]->(zaina) \
            CREATE (ranffi)-[r:FOLLOWS]->(zaina)',
            {
                zoe: 'zoe',
                zaina: 'zaina',
                ranffi: 'ranffi'
            }
        );

        // create contact relationship
        await session.run(
            'MATCH (rehab:User {username:$rehab}) \
            MATCH (ranffi:User {username:$ranffi}) \
            MATCH (zaina:User {username:$zaina}) \
            MATCH (zoe:User {username:$zoe}) \
            CREATE (rehab)-[rel1:CONTACTED]->(ranffi) \
            CREATE (ranffi)-[rel2:CONTACTED]->(rehab) \
            CREATE (zaina)-[rel3:CONTACTED]->(zoe) \
            CREATE (zoe)-[rel4:CONTACTED]->(zaina) \
            SET rel1.contactDate = $contactDate1 \
            SET rel2.contactDate = $contactDate1 \
            SET rel3.contactDate = $contactDate2 \
            SET rel4.contactDate = $contactDate2',
            {
                rehab: 'rehab',
                ranffi: 'ranffi',
                zoe: 'zoe',
                zaina: 'zaina',
                contactDate1: '2020-11-01',
                contactDate2: '2020-11-23'
            }
        );

        // create locations
        await session.run(
            'UNWIND $props AS map \
            CREATE (l:Location) \
            SET l = map',
            {
                "props": [{
                    "latitude": "40.721640",
                    "longitude": "-74.003780",
                }, {
                    "latitude": "40.771558",
                    "longitude": "-73.969837",
                }, {
                    "latitude": "40.807128",
                    "longitude": "-73.964116",
                },  {
                    "latitude": "40.751188",
                    "longitude": "-73.993060",
                },  {
                    "latitude": "40.766156",
                    "longitude": "-73.987882",
                }],
            }
        )

        // create location relationships
        await session.run(
            'MATCH (rehab:User {username:$rehab}) \
            MATCH (ranffi:User {username:$ranffi}) \
            MATCH (zaina:User {username:$zaina}) \
            MATCH (zoe:User {username:$zoe}) \
            MATCH (first:Location {latitude:$location1}) \
            MATCH (second:Location {latitude:$location2}) \
            CREATE (rehab)-[r1:VISITED]->(first) \
            CREATE (ranffi)-[r2:VISITED]->(first) \
            CREATE (zaina)-[r3:VISITED]->(first) \
            CREATE (zaina)-[r4:VISITED]->(second) \
            CREATE (zoe)-[r5:VISITED]->(second) \
            SET r1.VistedDate = $VistedDate1 \
            SET r2.VistedDate = $VistedDate1 \
            SET r3.VistedDate = $VistedDate3 \
            SET r4.VistedDate = $VistedDate2 \
            SET r5.VistedDate = $VistedDate2',
            {
                rehab: 'rehab',
                ranffi: 'ranffi',
                zoe: 'zoe',
                zaina: 'zaina',
                location1: '40.751188',
                location2: '40.807128',
                VistedDate1: '2020-11-01',
                VistedDate2: '2020-11-23',
                VistedDate3: '2020-10-04',
    
            }
        );

        console.log('seed complete!');
        await session.close();
        await db.close()
    }
    catch(err) {
        console.log(err);
    }

}
seed(driver);
