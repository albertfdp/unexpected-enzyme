import React from 'react';

import ReactElement from './ReactElement';
import ReactWrapper from './ReactWrapper';

const types = {
  installInto: function(childExpect) {
    var ReactElementType = childExpect.getType('ReactElement');

    childExpect.exportType(ReactElementType);

    childExpect.exportType(ReactWrapper);
  }
};

export default types;
