import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';

import React from 'react';
import { Foo } from './components';

describe('FullDOMRendering', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Foo bar="baz" />);
  });

  describe('checked', () => {
    beforeEach(() => {
      const Fixture = () => (
        <div>
          <input id="checked" defaultChecked />
          <input id="not" defaultChecked={false} />
        </div>
      );

      wrapper = mount(<Fixture />);
    });

    it('asserts that the given wrapper is checked', () => {
      expect(wrapper.find('#checked'), 'to be checked');
    });

    it('asserts that the input is not checked', () => {
      expect(wrapper.find('#not'), 'not to be checked');
    });

    describe('when it fails', () => {
      it('renders a comprensible error message', () => {
        expect(wrapper.find('#not'), 'to be checked');
      });
    });
  });
});
