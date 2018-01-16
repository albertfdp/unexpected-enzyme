import assertions from './assertions';
import types from './types';

const unexpectedEnzyme = {
  name: 'unexpected-enzyme',

  installInto: function(expect) {
    types.installInto(expect);
    assertions.installInto(expect);
  }
};

export default unexpectedEnzyme;
