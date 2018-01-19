import ReactWrapper from 'enzyme/build/ReactWrapper';

const ReactWrapperType = {
  name: 'ReactWrapper',
  identify: function(reactWrapper) {
    return reactWrapper && reactWrapper instanceof ReactWrapper;
  },
  inspect: function(reactWrapper, depth, output) {
    output.appendInspected(reactWrapper.getElement());
  }
};

export default ReactWrapperType;
