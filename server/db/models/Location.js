const _ = require('lodash');

function Location(_node) {
    _.extend(this, _node.properties);
}

module.exports = Location;
