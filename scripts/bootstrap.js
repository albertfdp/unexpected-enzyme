unexpected = require('unexpected').clone();

unexpected.output.preferredWidth = 80;
unexpected.use(require('../src'));

expect = unexpected.clone();
