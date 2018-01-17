import unexpectedReact from 'unexpected-react';

import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter()
});

afterEach(() => {
  unexpectedReact.clearAll();
});
