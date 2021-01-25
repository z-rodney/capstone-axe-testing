const neo4j = require('neo4j-driver');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// const { NEO4J_URI, NEO4J_PASSWORD, NEO4J_USER } = require('../../constants');

// const NEO4J_URI = process.env.NEO4J_URI;
// const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;
// const NEO4J_USER = process.env.NEO4J_USER;

const NEO4J_URI = 'bolt://database:7687';
const NEO4J_PASSWORD = '2007flex';
const NEO4J_USER = 'neo4j';

// create a driver instance
const driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
);

module.exports = driver;

