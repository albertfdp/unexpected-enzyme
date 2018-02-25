import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name }) => <div className={name} />;

User.propTypes = {
  name: PropTypes.string.isRequired
};

describe('when-setting-props', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<User name="foo" />);
  });

  it('passes when actual matches the expected', () => {
    expect(wrapper.find('.foo'), 'to exist');
    expect(wrapper.find('.bar'), 'not to exist');
  });

  describe('when updating props', () => {
    it('updates the className', () => {
      expect(
        wrapper,
        'when setting props',
        { name: 'bar' },
        'queried for',
        '.bar',
        'to exist'
      );
    });

    it('previous className is no longer rendered', () => {
      expect(
        wrapper,
        'when setting props',
        { name: 'bar' },
        'queried for',
        '.foo',
        'not to exist'
      );
    });
  });
});
