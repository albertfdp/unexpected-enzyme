import assertions from './assertions';
import types from './types';
import unexpectedReact from 'unexpected-react';

const unexpectedEnzyme = {
  name: 'unexpected-enzyme',

  installInto: function(expect) {
    var childExpect = expect.child();
    childExpect.use(unexpectedReact);
    types.installInto(childExpect);
    assertions.installInto(childExpect);
  }
};

unexpectedEnzyme.clearAll = unexpectedReact.clearAll;

export default unexpectedEnzyme;
