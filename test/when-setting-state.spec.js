import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'foo'
    };
  }

  render() {
    return <div className={this.state.name} />;
  }
}

describe('when-setting-state', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<User />);
  });

  it('passes when actual matches the expected', () => {
    expect(wrapper.find('.foo'), 'to exist');
    expect(wrapper.find('.bar'), 'not to exist');
  });

  describe('when updating props', () => {
    it('updates the className', () => {
      expect(
        wrapper,
        'when setting state',
        { name: 'bar' },
        'queried for',
        '.bar',
        'to exist'
      );
    });

    it('previous className is no longer rendered', () => {
      expect(
        wrapper,
        'when setting state',
        { name: 'bar' },
        'queried for',
        '.foo',
        'not to exist'
      );
    });
  });
});
