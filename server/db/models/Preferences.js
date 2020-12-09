const _ = require('lodash');

function Preferences(_node) {
    _.extend(this, _node.properties);
}

module.exports = Preferences;
