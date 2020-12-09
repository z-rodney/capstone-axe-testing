const _ = require('lodash');

//expected properties:
//result
//date
function TestResult(_node) {
    _.extend(this, _node.properties);
    if (_node.properties.testDate.year) {
        this.testDate = new Date(this.testDate.year.low, this.testDate.month.low - 1, this.testDate.day.low).toDateString()
    }
}

module.exports = TestResult;
