const Rx = require('rx');
let subject ;

if (!subject) {
  subject = new Rx.Subject();
}

module.exports = subject;
