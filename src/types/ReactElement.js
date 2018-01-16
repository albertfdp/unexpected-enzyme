import React from 'react';

const ReactElement = {
  name: 'ReactElement',

  identify: function(value) {
    return (
      React.isValidElement(value) ||
      (typeof value === 'object' &&
        value !== null &&
        (typeof value.type === 'function' || typeof value.type === 'string') &&
        typeof value.hasOwnProperty === 'function' &&
        value.hasOwnProperty('props') &&
        value.hasOwnProperty('ref') &&
        value.hasOwnProperty('key'))
    );
  },

  inspect: (value, depth, output, inspect) => {
    // TODO
  }
};

export default ReactElement;
