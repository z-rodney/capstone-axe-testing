const neo4j = require('neo4j-driver');
const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } = require('../../constants');

// create a driver instance
const driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
);

module.exports = driver;

