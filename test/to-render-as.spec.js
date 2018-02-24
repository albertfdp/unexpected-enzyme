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

describe('to-render-as', () => {
  describe('when it is a subtree', () => {
    it('passes when the actual matches the expected', () => {
      const wrapper = mount(
        <User>
          <div id="child">Children</div>
        </User>
      );

      expect(wrapper, 'to render as', <div id="child">Children</div>);
    });

    it('fails when the actual does not the expected', () => {
      const wrapper = mount(
        <User>
          <div id="child">Foo</div>
        </User>
      );

      expect(
        () => expect(wrapper, 'to render as', <div id="child">Children</div>),
        'with error matching snapshot'
      );
    });

    it('fails when the actual is not anywhere on the tree', () => {
      const wrapper = mount(
        <User>
          <div id="child">Foo</div>
        </User>
      );

      expect(
        () => expect(wrapper, 'to render as', <h3>Header</h3>),
        'with error matching snapshot'
      );
    });
  });
});
