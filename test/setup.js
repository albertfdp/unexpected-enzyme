import unexpectedEnzyme from '../src';

import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter()
});

afterEach(() => {
  unexpectedEnzyme.clearAll();
});
