const _ = require('lodash');

//expected properties:
//result
//date
function TestResult(_node) {
    _.extend(this, _node.properties);
}

module.exports = TestResult;
