// these will eventually need to go into .env to successfully deploy, but couldn't get that working currently
const NEO4J_URI = 'bolt://localhost:7687';
const NEO4J_USER = 'neo4j';
const NEO4J_PASSWORD = '2007flex';
const NEO4J_DATABASE = 'neo4j';
const MAPBOXPK = 'pk.eyJ1Ijoiei1yb2RuZXkiLCJhIjoiY2tpMXNhNmU0MDl4dzJybDhuYWczaWNqYyJ9.gozaNJTshiYEyOKy2_BDvw';
const mapBoxStyleURL = 'mapbox://styles/z-rodney/cki1sk68625qf19pfl7felgjh'

module.exports = {
    NEO4J_URI,
    NEO4J_USER,
    NEO4J_DATABASE,
    NEO4J_PASSWORD,
    MAPBOXPK,
    mapBoxStyleURL
}
