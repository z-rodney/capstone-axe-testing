/* eslint-disable quote-props */
/* eslint-disable no-multi-str */
const bcrypt = require('bcrypt');
const driver = require('./server/db/db');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const seed = async (db) => {
    console.log('in seed')

    const hashedPW = await bcrypt.hash('test', 10);

    try {
        // create database session
        const session = db.session({ database: process.env.NEO4J_DATABASE });

        // drop existing db records (similar to force: true in sequelize)
        await session.run('MATCH (n) DETACH DELETE n');

        // add unique constraint for username
        await session.run('CREATE CONSTRAINT unique_username IF NOT EXISTS ON (user:User) ASSERT user.username IS UNIQUE');

        // create 4 new users
        await session.run(
            `UNWIND $props AS map CREATE (u:User {userId: apoc.create.uuid(), name: map.name, username: map.username, password: map.password})`,
            {'props': [{
                    'username': 'zoe.greene12@gmail.com',
                    'name': 'Zoe',
                    'password': hashedPW,
                }, {
                    'username': 'zainarodney@aol.com',
                    'name': 'Zaina',
                    'password': hashedPW,
                }, {
                    'username': 'rehab@rehab.com',
                    'name': 'Rehab',
                    'password': hashedPW,
                }, {
                    'username': 'ranffi@ranffi.com',
                    'name': 'Ranffi',
                    'password': hashedPW,
                }, {
                    'username': 'eliot@test.com',
                    'name': 'Eliot',
                    'password': hashedPW,
                }, {
                    'username': 'peet@test.com',
                    'name': 'Peet',
                    'password': hashedPW,
                }, {
                    'username': 'ben@test.com',
                    'name': 'Ben',
                    'password': hashedPW,
                }, {
                    'username': 'stanley@test.com',
                    'name': 'Stanley',
                    'password': hashedPW,
                }, {
                    'username': 'prof@test.com',
                    'name': 'Prof',
                    'password': hashedPW,
                }]}
        );

        // create preferences
        await session.run(
            `UNWIND $props AS map
            CREATE (p: Preferences)
            SET p = map`,
            {
                'props': [{
                    'mask': 'sometimes',
                    'indoorDining': false,
                    'outdoorDining': true,
                    'pubTrans': true,
                    'householdSize': 3,
                    'covidPosContact': false,
                    'immunocompromised': false,
                    'essentialWorker': false
                }, {
                    'mask': 'always',
                    'indoorDining': true,
                    'outdoorDining': false,
                    'pubTrans': false,
                    'householdSize': 2,
                    'immunocompromised': false,
                    'essentialWorker': false,
                    'covidPosContact': false
                }, {
                    'mask': 'sometimes',
                    'indoorDining': false,
                    'outdoorDining': true,
                    'pubTrans': false,
                    'householdSize': 5,
                    'immunocompromised': false,
                    'essentialWorker': true,
                    'covidPosContact': false,
                }, {
                    'mask': 'always',
                    'indoorDining': false,
                    'outdoorDining': true,
                    'pubTrans': false,
                    'householdSize': 6,
                    'immunocompromised': false,
                    'essentialWorker': false,
                    'covidPosContact': false,
                }]
            }
        );

             //create user/preference relationship
             await session.run(
                `MATCH (zoe:User {username:$zoe})
                MATCH (zaina:User {username:$zaina})
                MATCH (ranffi:User {username:$ranffi})
                MATCH (rehab:User {username:$rehab})
                MATCH (p1:Preferences) WHERE p1.householdSize = 3
                MATCH (p2:Preferences) WHERE p2.householdSize = 2
                MATCH (p3:Preferences) WHERE p3.householdSize = 5
                MATCH (p4:Preferences) WHERE p4.householdSize = 6
                CREATE (zoe)-[rel1:PREFERS]->(p1)
                CREATE (zaina)-[rel2:PREFERS]->(p2)
                CREATE (ranffi)-[rel3:PREFERS]->(p3)
                CREATE (rehab)-[rel4:PREFERS]->(p4)`,
                {
                    zoe: 'zoe.greene12@gmail.com',
                    zaina: 'zainarodney@aol.com',
                    ranffi: 'ranffi@ranffi.com',
                    rehab: 'rehab@rehab.com'
                }
            );

        // create friend/follow relationship
        await session.run(
            `MATCH (zoe:User {username:$zoe})
            MATCH (zaina:User {username:$zaina})
            MATCH (rehab:User {username:$rehab})
            MATCH (ranffi:User {username:$ranffi})
            CREATE (zoe)-[:FOLLOWS]->(zaina)
            CREATE (ranffi)-[:FOLLOWS]->(zaina)
            CREATE (rehab)-[:FOLLOWS]->(zaina)
            CREATE (zaina)-[:FOLLOWS]->(zoe)
            CREATE (rehab)-[:FOLLOWS]->(zoe)
            CREATE (ranffi)-[:FOLLOWS]->(zoe)
            CREATE (zoe)-[:FOLLOWS]->(rehab)
            CREATE (zaina)-[:FOLLOWS]->(rehab)
            CREATE (ranffi)-[:FOLLOWS]->(rehab)
            CREATE (zoe)-[:FOLLOWS]->(ranffi)
            CREATE (zaina)-[:FOLLOWS]->(ranffi)
            CREATE (rehab)-[:FOLLOWS]->(ranffi)`,
            {
                zoe: 'zoe.greene12@gmail.com',
                zaina: 'zainarodney@aol.com',
                ranffi: 'ranffi@ranffi.com',
                rehab: 'rehab@rehab.com'
            }
        );

        // create contact relationship
        await session.run(
            `MATCH (rehab:User {username:$rehab})
            MATCH (ranffi:User {username:$ranffi})
            MATCH (zaina:User {username:$zaina})
            MATCH (zoe:User {username:$zoe})
            MATCH (eliot:User {username:$eliot})
            MATCH (peet:User {username:$peet})
            MATCH (ben:User {username:$ben})
            MATCH (stanley:User {username:$stanley})
            MATCH (prof:User {username:$prof})
            CREATE (rehab)-[rel1:CONTACTED]->(ranffi)
            CREATE (ranffi)-[rel2:CONTACTED]->(rehab)
            CREATE (zaina)-[rel3:CONTACTED]->(zoe)
            CREATE (zoe)-[rel4:CONTACTED]->(zaina)
            CREATE (zoe)-[rel5:CONTACTED]->(eliot)
            CREATE (eliot)-[rel6:CONTACTED]->(zoe)
            CREATE (zoe)-[rel7:CONTACTED]->(peet)
            CREATE (peet)-[rel8:CONTACTED]->(zoe)
            CREATE (zaina)-[rel9:CONTACTED]->(ben)
            CREATE (ben)-[rel10:CONTACTED]->(zaina)
            CREATE (zaina)-[rel11:CONTACTED]->(stanley)
            CREATE (stanley)-[rel12:CONTACTED]->(zaina)
            CREATE (ben)-[rel13:CONTACTED]->(prof)
            CREATE (prof)-[rel14:CONTACTED]->(ben)
            CREATE (prof)-[rel15:CONTACTED]->(rehab)
            CREATE (rehab)-[rel16:CONTACTED]->(prof)
            SET rel1.contactDate = $contactDate1
            SET rel2.contactDate = $contactDate1
            SET rel3.contactDate = $contactDate2
            SET rel4.contactDate = $contactDate2
            SET rel5.contactDate = $contactDate2
            SET rel6.contactDate = $contactDate2
            SET rel7.contactDate = $contactDate2
            SET rel8.contactDate = $contactDate2
            SET rel9.contactDate = $contactDate2
            SET rel10.contactDate = $contactDate2
            SET rel11.contactDate = $contactDate2
            SET rel12.contactDate = $contactDate2
            SET rel13.contactDate = $contactDate2
            SET rel14.contactDate = $contactDate2
            SET rel15.contactDate = $contactDate2
            SET rel16.contactDate = $contactDate2
            `,
            {
                zoe: 'zoe.greene12@gmail.com',
                zaina: 'zainarodney@aol.com',
                ranffi: 'ranffi@ranffi.com',
                rehab: 'rehab@rehab.com',
                eliot: 'eliot@test.com',
                peet: 'peet@test.com',
                ben: 'ben@test.com',
                stanley: 'stanley@test.com',
                prof: 'prof@test.com',
                contactDate1: '2020-11-01',
                contactDate2: '2020-11-23'
            }
        );

        // create locations
        await session.run(
            `UNWIND $props AS map
            CREATE (l:Location { locationId: apoc.create.uuid(), title: map.title, coordinates: map.coordinates, placeName: map.placeName })`,
            {
                props: [{
                    title: 'Central Park Hang',
                    coordinates: [-73.96666700000003, 40.785167],
                    placeName: 'Central Park, New York',
                  },
{
                    title: 'It\'s the Brooklyn Way',
                    coordinates: [-73.96900904305689, 40.6627416764545],
                    placeName: 'Prospect Park, Brooklyn, New York',
                  },
                  {
                    title: 'Bx the Best',
                    coordinates: [-73.92555771551504, 40.87191365945296],
                    placeName: 'Innwood Hill Park, Washington Heights, New York',
                },  {
                    title: 'Madison Square Garden',
                    coordinates: [-73.9934, 40.7505],
                    placeName: '4 Pennsylvania Plaza, New York, NY'
                },  {
                    title: 'Rockefeller Center',
                    coordinates: [-73.9787, 40.7587],
                    placeName: '45 Rockefeller Plaza, New York, NY'
                }],
            }
        )

        // create location relationships
        await session.run(
            'MATCH (rehab:User {username:$rehab}) \
            MATCH (ranffi:User {username:$ranffi}) \
            MATCH (zaina:User {username:$zaina}) \
            MATCH (zoe:User {username:$zoe}) \
            MATCH (first:Location {title:$location1}) \
            MATCH (second:Location {title:$location2}) \
            MATCH (third:Location {title:$location3}) \
            MATCH (fourth:Location {title:$location4}) \
            CREATE (rehab)-[r1:VISITED]->(first) \
            CREATE (ranffi)-[r2:VISITED]->(first) \
            CREATE (zaina)-[r3:VISITED]->(first) \
            CREATE (zoe)-[r4:VISITED]->(first) \
            CREATE (rehab)-[r5:VISITED]->(second) \
            CREATE (ranffi)-[r6:VISITED]->(second) \
            CREATE (zaina)-[r7:VISITED]->(second) \
            CREATE (zoe)-[r8:VISITED]->(second) \
            CREATE (rehab)-[r9:VISITED]->(third) \
            CREATE (ranffi)-[r10:VISITED]->(third) \
            CREATE (zaina)-[r11:VISITED]->(third) \
            CREATE (zoe)-[r12:VISITED]->(third) \
            CREATE (rehab)-[r13:VISITED]->(fourth) \
            CREATE (ranffi)-[r14:VISITED]->(fourth) \
            CREATE (zaina)-[r15:VISITED]->(fourth) \
            CREATE (zoe)-[r16:VISITED]->(fourth) \
            SET r1.visitedDate = $visitedDate1 \
            SET r2.visitedDate = $visitedDate1 \
            SET r3.visitedDate = $visitedDate1 \
            SET r4.visitedDate = $visitedDate1 \
            SET r5.visitedDate = $visitedDate2 \
            SET r6.visitedDate = $visitedDate2 \
            SET r7.visitedDate = $visitedDate2 \
            SET r8.visitedDate = $visitedDate2 \
            SET r9.visitedDate = $visitedDate3 \
            SET r10.visitedDate = $visitedDate3 \
            SET r11.visitedDate = $visitedDate3 \
            SET r12.visitedDate = $visitedDate3 \
            SET r13.visitedDate = $visitedDate4 \
            SET r14.visitedDate = $visitedDate4 \
            SET r15.visitedDate = $visitedDate4 \
            SET r16.visitedDate = $visitedDate4',
            {
                zoe: 'zoe.greene12@gmail.com',
                zaina: 'zainarodney@aol.com',
                ranffi: 'ranffi@ranffi.com',
                rehab: 'rehab@rehab.com',
                location1: 'Central Park Hang',
                location2: 'Bx the Best',
                location3: 'Madison Square Garden',
                location4: 'Rockefeller Center',
                visitedDate1: '2020-12-06',
                visitedDate2: '2020-12-06',
                visitedDate3: '2020-12-06',
                visitedDate4: '2020-12-02',
            }
        );

        //create tests
        await session.run(`
        MATCH (zoe:User{username: 'zoe.greene12@gmail.com'})
        MATCH (rehab:User {username:'rehab@rehab.com'})
        MATCH (ranffi:User {username:'ranffi@ranffi.com'})
        MATCH (zaina:User {username:'zainarodney@aol.com'})
        CREATE (zoe)-[rel1:TESTED]->(testRes1:TestResult {covidTest:'Negative', testDate:date('2020-11-23')})
        CREATE (zaina)-[rel2:TESTED]->(testRes2:TestResult {covidTest:'Positive', testDate:date('2020-09-09')})
        CREATE (rehab)-[rel3:TESTED]->(testRes3:TestResult {covidTest:'Negative', testDate:date('2020-10-14')})
        CREATE (ranffi)-[rel4:TESTED]->(testRes4:TestResult {covidTest:'Negative', testDate:date('2020-12-01')})
        `)

        console.log('seed complete!');
        await session.close();
        await db.close()
    }
    catch (err) {
        console.log(err);
    }

}
seed(driver);
