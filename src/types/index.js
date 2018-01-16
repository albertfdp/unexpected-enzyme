import ReactElement from './ReactElement';
import ReactWrapper from './ReactWrapper';

const types = {
  installInto: function(expect) {
    expect.addType(ReactElement);

    expect.addType(ReactWrapper);
  }
};

export default types;
