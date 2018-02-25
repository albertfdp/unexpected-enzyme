import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React, { Component } from 'react';

class Fixture extends Component {
  render() {
    return (
      <div>
        <input id="checked" defaultChecked />
        <input id="not" defaultChecked={false} />
      </div>
    );
  }
}

describe('to-be-checked', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Fixture />);
  });

  it('passes when the actual matches the expected', () => {
    expect(wrapper.find('#checked'), 'to be checked');
  });

  it('passes negated when the actual does not match the expected', () => {
    expect(wrapper.find('#not'), 'not to be checked');
  });

  it('fails when the actual does not match the expected', () => {
    expect(
      () => expect(wrapper.find('#not'), 'to be checked'),
      'with error matching snapshot'
    );

    expect(() => {
      expect(wrapper.find('#checked'), 'not to be checked');
    }, 'with error matching snapshot');
  });
});
