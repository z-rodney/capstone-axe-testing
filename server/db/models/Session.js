const _ = require('lodash');

function Session(_node) {
    _.extend(this, _node.properties);
}

module.exports = Session;
