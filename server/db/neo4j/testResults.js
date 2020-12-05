const _ = require('lodash');
const TestResult = require('../models/TestResults');
const driver = require('../db');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

async function getResults(username) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE })
  try {
    const result = await session.readTransaction(tx =>
      tx.run(`MATCH (user:User {username:$username})-[rel:TESTED]->(test)
      RETURN test`, {username}))
    if (_.isEmpty(result.records)) {
      return null
    }
    const { records } = result
    const testResults = []
    records.forEach(test => {
      testResults.push(new TestResult(test.get('test')))
    })
    return testResults
  } catch (err) {
    throw err
  } finally {
    await session.close()
  }
}

async function postResults(username, testResult, date) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE })
  try {
    const result = await session.writeTransaction(tx =>
      tx.run(`MATCH (user:User {username:$username})
      CREATE (user)-[rel:TESTED]->(testRes:TestResult {covidTest:$testResult, testDate:$date})
      RETURN rel, testRes`, { username, testResult, date }))
    if (_.isEmpty(result.records)) {
      throw new Error('Could not add results')
    }
    return new TestResult(result.records[0].get('testRes'))
  } catch (err) {
    throw err
  } finally {
    await session.close()
  }
}

module.exports = {
  postResults,
  getResults
}
