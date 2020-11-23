const _ = require('lodash');

function User(_node) {
    _.extend(this, _node.properties);

    if (this.householdSize) {
        this.householdSize = this.householdSize.toNumber(); 
    }
}

module.exports = User;