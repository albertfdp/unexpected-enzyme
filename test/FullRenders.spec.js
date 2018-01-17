import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import sinon from 'sinon';

import React from 'react';
import { Foo, User, UserList } from './components';

describe('FullDOMRendering', () => {
  let wrapper;

  describe('to contain', () => {
    beforeEach(() => {
      wrapper = mount(<UserList />);
    });

    it('contains a single User', () => {
      expect(wrapper, 'to contain', <User index={1} />);
    });

    it('not to contain', () => {
      expect(wrapper, 'not to contain', <User index={4} />);
    });

    describe('failed assertion', () => {
      it('contains a single User', () => {
        expect(wrapper, 'to contain', <User index={4} />);
      });

      it('not to contain', () => {
        expect(wrapper, 'not to contain', <User index={1} />);
      });
    });
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

    describe.skip('when it fails', () => {
      it('renders a comprensible error message', () => {
        expect(wrapper.find('#not'), 'to be checked');
      });
    });
  });
});
