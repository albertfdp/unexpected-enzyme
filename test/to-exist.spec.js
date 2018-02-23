import expect from './unexpected-enzyme';
import { mount } from 'enzyme';
import React, { Component } from 'react';

class Fixture extends React.Component {
  render() {
    return (
      <div>
        <div id="parent" />
      </div>
    );
  }
}

const NullFixture = () => null;

describe('to-have-props-satisfying', () => {
  it('passes when the actual matches the expected', () => {
    const wrapper = mount(<Fixture />);

    expect(wrapper.find('#parent'), 'to be present');
    expect(wrapper.find('#parent'), 'to exist');
  });

  it('fails when the actual does not match the expected', () => {
    const wrapper = mount(<Fixture />);

    expect(
      () => expect(wrapper.find('#parent'), 'not to be present'),
      'with error matching snapshot'
    );
  });
});
