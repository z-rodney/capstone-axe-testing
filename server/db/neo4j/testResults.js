/* eslint-disable no-console */
const _ = require('lodash');
const TestResult = require('../models/TestResults');
const driver = require('../db');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


/**
 * Get all test results associated with the user node for the given userId
 *
 * @param {*} userId
 * @return {*} All test results for the given user in an array
 */
async function getResults(userId) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE });
  try {
    const result = await session.readTransaction(tx =>
      tx.run(`
        MATCH (user:User {userId:$userId})-[rel:TESTED]->(test)
        RETURN test`, {userId}));
    if (_.isEmpty(result.records)) {
      return null;
    }
    const { records } = result;
    const testResults = [];
    records.forEach(test => {
      testResults.push(new TestResult(test.get('test')));
    })
    return testResults;
  } catch (err) {
    console.log(err);
  } finally {
    await session.close();
  }
}


/**
 * Add new test results to the user's associated test results node
 *
 * @param {*} userId
 * @param {*} testResult
 * @param {*} date
 * @return {*}
 */
async function postResults(userId, testResult, date) {
  const session = driver.session({ database: process.env.NEO4J_DATABASE });
  try {
    const result = await session.writeTransaction(tx =>
      tx.run(`
        MATCH (user:User {userId:$userId})
        CREATE (user)-[rel:TESTED]->(testRes:TestResult {covidTest:$testResult, testDate:date($date)})
        RETURN rel, testRes`, { userId, testResult, date }));
    if (_.isEmpty(result.records)) {
      throw new Error('Could not add results');
    }
    return new TestResult(result.records[0].get('testRes'));
  } catch (err) {
    console.log(err);
  } finally {
    await session.close();
  }
}

module.exports = {
  postResults,
  getResults
};
