const driver = require('../server/db/db');
const { createUser, getUserByUsername } = require('../server/db/neo4j/user');
const { addFriend, getFriends } = require('../server/db/neo4j/friends');
const { addLocation, addPreferences } = require('../server/db/neo4j');
const { postResults } = require('../server/db/neo4j/testResults');

afterAll(async function () {
  await driver.close();
});

describe('User nodes', () => {
  it('creates a user node with specified properties', async () => {
    const session = driver.session({ database: process.env.NEO4J_DATABASE });
    // drop existing db records (similar to force: true in sequelize)
    await session.run('MATCH (n) DETACH DELETE n');
    await createUser('test@123.com', 'test', 'Jest');
    const newUser = await getUserByUsername('test@123.com');
    expect(newUser.name).toBe('Jest');
  });
  it('throws an error if username already exists', async () => {
    try {
      await createUser('test@123.com', 'test', 'Jest');
      throw Error('createUser was successful but should have failed with this username');
    }
    catch (err) {
      expect(err.message).toContain('already exists with');
    }
  })
});

describe('Friend relationships', () => {
  it('creates relationship with another user', async () => {
    const friend = await createUser('friend@test.com', 'test', 'Friend');
    const me = await getUserByUsername('test@123.com');
    await addFriend(me.userId, friend.userId);
    let myFriends = await getFriends(me.userId);
    myFriends = myFriends.map(f => f.userId);
    expect(myFriends.includes(friend.userId)).toBe(true);
  });
});

describe('Adding locations', () => {
  it('adds a location to your history and that of your contacts', async () => {
    const me = await getUserByUsername('test@123.com');
    const friend = await getUserByUsername('friend@test.com');
    const location = {
      title: 'Rockefeller Center',
      date: '2020-12-25',
      coordinates: [-73.9787, 40.7587],
      placeName: '45 Rockefeller Plaza, New York, NY',
      contacts: [friend.userId],
      covidData: { caseDensity: 5000, testPositivityRatio: 0.03 }
    };
    const created = await addLocation(location, me.userId);
    expect(created.location.title).toBe('Rockefeller Center');
    expect(created.contacts[0].name).toBe('Friend');
  });
});

describe('Adding test results', () => {
  it('adds a test result associated with your user node', async () => {
    const me = await getUserByUsername('test@123.com');
    const created = await postResults(me.userId, 'negative', '2020-12-20');
    expect(created.covidTest).toBe('negative');
  });
});

describe('Adding user preferences', () => {
  it('adds preferences associated with your user node', async () => {
    const me = await getUserByUsername('test@123.com');
    const prefs = {
      userId: me.userId,
      householdSize: 2,
      indoorDining: false,
      outdoorDining: false,
      essentialWorker: false,
      immunocompromised: false,
      mask: true,
      pubTrans: false
    }
    const created = await addPreferences(prefs);
    expect(created.indoorDining).toBe(false);
  });
});

