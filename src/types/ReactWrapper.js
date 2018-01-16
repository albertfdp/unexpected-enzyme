import ReactWrapper from 'enzyme/build/ReactWrapper';

const ReactWrapperType = {
  name: 'ReactWrapper',
  identify: reactWrapper => reactWrapper instanceof ReactWrapper,
  inspect: (reactWrapper, depth, output, inspect) => {
    output.text(`ReactWrapper`);
  }
};

export default ReactWrapperType;
