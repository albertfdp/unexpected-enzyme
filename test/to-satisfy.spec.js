import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types';

const User = ({ children }) => (
  <div className="user">
    <h3 id="name">Harriet</h3>
    {children}
  </div>
);

User.propTypes = {
  children: PropTypes.node
};

describe('to-satisfy', () => {
  describe('when it is a subtree', () => {
    it('passes when the actual matches the expected', () => {
      const wrapper = mount(
        <User>
          <div id="child">Children</div>
        </User>
      );

      expect(
        wrapper,
        'to satisfy',
        <User>
          <div>Children</div>
        </User>
      );
    });

    it('fails when the actual does not the expected', () => {
      const wrapper = mount(
        <User>
          <div id="child">Foo</div>
        </User>
      );

      expect(
        () =>
          expect(
            wrapper,
            'to satisfy',
            <User>
              <div id="child">Children</div>
            </User>
          ),
        'with error matching snapshot'
      );
    });

    it('fails when the actual not matching the expected type', () => {
      const wrapper = mount(
        <User>
          <div id="child">Foo</div>
        </User>
      );

      expect(
        () => expect(wrapper, 'to satisfy', <h3>Header</h3>),
        'with error matching snapshot'
      );
    });
  });
});
