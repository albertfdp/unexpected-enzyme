import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types';

const User = (props, context) => <div>{context.name}</div>;

User.contextTypes = {
  name: PropTypes.string
};

describe('when-setting-context', () => {
  let wrapper;
  let context = { name: 'foo' };

  beforeEach(() => {
    wrapper = mount(<User />, { context });
  });

  it('passes when actual matches the expected', () => {
    expect(wrapper, 'to render text', 'foo');
  });

  describe('when updating props', () => {
    it('updates the className', () => {
      expect(
        wrapper,
        'when setting context',
        { name: 'bar' },
        'to render text',
        'bar'
      );
    });
  });
});
