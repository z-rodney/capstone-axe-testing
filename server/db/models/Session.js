const _ = require('lodash');

// expected property of sessionId
function Session(_node) {
    _.extend(this, _node.properties);
}

module.exports = Session;
